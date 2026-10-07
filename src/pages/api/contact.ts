import type { APIRoute } from "astro";
import { getSecret } from "astro:env/server";
import { ROUTES, content, type Locale } from "../../lib/content";

export const prerender = false;

/**
 * Contact form handler.
 *
 * Takes a normal form POST rather than a fetch, so the form works as a form:
 * the response is a redirect back to the contact page carrying a status in the
 * query string. The only JavaScript on the page is Turnstile's own widget.
 *
 * Three layers of spam defence, cheapest first:
 *   1. A honeypot field, which real people never fill in and crude bots always do.
 *   2. A per-IP rate limit, which costs nothing and stops floods.
 *   3. Turnstile, verified server side. A token the browser never checked is
 *      worth nothing, so the check has to happen here.
 *
 * Every secret is optional in the schema so the site builds before the keys
 * exist. This refuses loudly when one is missing, because the dangerous
 * failure is accepting a message and quietly dropping it: the sender believes
 * they have made contact and nobody ever sees it.
 */

const TURNSTILE_VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_SEND = "https://api.resend.com/emails";

// message matches the counter the design shows, and the maxlength on the
// field. Trimming here as well, because a crafted POST ignores both.
const MAX_LENGTHS = { name: 120, company: 160, email: 200, phone: 60, product: 120, message: 500 };

/**
 * In-memory, per-instance rate limit. Serverless means several instances and a
 * cold start wipes it, so this throttles rather than guarantees. Turnstile is
 * the real gate; this just keeps one noisy source from burning send quota.
 */
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude cap so this cannot grow without bound
  return recent.length > RATE_LIMIT.max;
}

const clean = (v: FormDataEntryValue | null, max: number): string =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";

/** Deliberately permissive: the aim is to catch typos, not police addresses. */
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** Header injection guard for anything that reaches a mail header. */
const safeHeader = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

const esc = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  try {
    const res = await fetch(TURNSTILE_VERIFY, { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const form = await request.formData();

  const locale: Locale = clean(form.get("locale"), 2) === "en" ? "en" : "sv";
  const back = (status: string) =>
    new Response(null, {
      status: 303,
      headers: { location: `${ROUTES.contact[locale]}?status=${status}#form`, "cache-control": "no-store" },
    });

  // 1. Honeypot. Named innocuously and hidden from people and screen readers;
  // anything in it is a bot. Answer as if it worked, so it learns nothing.
  if (clean(form.get("website"), 200)) return back("sent");

  const ip = clientAddress ?? "";
  if (ip && rateLimited(ip)) return back("rate");

  const name = clean(form.get("name"), MAX_LENGTHS.name);
  const company = clean(form.get("company"), MAX_LENGTHS.company);
  const email = clean(form.get("email"), MAX_LENGTHS.email);
  const phone = clean(form.get("phone"), MAX_LENGTHS.phone);
  const product = clean(form.get("product"), MAX_LENGTHS.product);
  const message = clean(form.get("message"), MAX_LENGTHS.message);
  const consent = form.get("consent") === "on";

  if (!name || !looksLikeEmail(email) || message.length < 10 || !consent) return back("invalid");

  const turnstileSecret = getSecret("TURNSTILE_SECRET_KEY");
  if (!turnstileSecret) {
    console.error("[contact] TURNSTILE_SECRET_KEY is not set; refusing to accept submissions");
    return back("server");
  }
  const token = clean(form.get("cf-turnstile-response"), 4096);
  if (!token || !(await verifyTurnstile(token, turnstileSecret, ip))) return back("captcha");

  const resendKey = getSecret("RESEND_API_KEY");
  const to = getSecret("CONTACT_TO_EMAIL") || content.site.email;
  const from = getSecret("CONTACT_FROM_EMAIL");
  if (!resendKey || !to || !from) {
    console.error("[contact] missing RESEND_API_KEY, CONTACT_FROM_EMAIL or a recipient; message not sent");
    return back("server");
  }

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Company", company],
    ["Email", email],
    ["Phone", phone],
    ["Product", product],
    ["Language", locale === "sv" ? "Swedish" : "English"],
  ].filter(([, v]) => v) as Array<[string, string]>;

  const html = [
    `<h2>New enquiry from the website</h2>`,
    `<table cellpadding="6" style="border-collapse:collapse">`,
    ...rows.map(
      ([k, v]) =>
        `<tr><td style="color:#667;white-space:nowrap">${esc(k)}</td><td><strong>${esc(v)}</strong></td></tr>`,
    ),
    `</table>`,
    `<h3>Message</h3>`,
    `<p style="white-space:pre-wrap">${esc(message)}</p>`,
  ].join("");

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Message:", message].join("\n");

  try {
    const res = await fetch(RESEND_SEND, {
      method: "POST",
      headers: { authorization: `Bearer ${resendKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: safeHeader(from),
        to: [safeHeader(to)],
        // So a reply in the inbox goes to the enquirer, not to the sender
        // address, which nobody reads.
        reply_to: safeHeader(email),
        subject: safeHeader(`Enquiry: ${product || "general"}, ${name}${company ? ` (${company})` : ""}`),
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend rejected the message", res.status, await res.text().catch(() => ""));
      return back("server");
    }
  } catch (err) {
    console.error("[contact] could not reach Resend", err);
    return back("server");
  }

  return back("sent");
};

/** A GET here is someone poking at the endpoint; send them to the form. */
export const GET: APIRoute = () =>
  new Response(null, { status: 303, headers: { location: ROUTES.contact.sv } });
