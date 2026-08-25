import { defineMiddleware } from "astro:middleware";
import { getSecret } from "astro:env/server";

/**
 * Password gate for the admin surfaces.
 *
 * The public pages are prerendered and served straight off the CDN, so they
 * never reach this middleware and stay fast and open for reviewers. Everything
 * listed below is on-demand, which means it does pass through here.
 *
 * The API routes are the real reason this exists. /api/translate spends
 * Anthropic credits once a key is set on the host, and /api/content writes to
 * the content files once the CMS is on GitHub storage. Both are harmless while
 * staging has no key and a read-only filesystem, and neither stays harmless.
 */
const PROTECTED = ["/keystatic", "/translate", "/api/translate", "/api/content"];

/** Length-independent comparison, so a wrong guess leaks nothing via timing. */
function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  // Fold the length difference into the result rather than returning early.
  let diff = ab.length ^ bb.length;
  const max = Math.max(ab.length, bb.length);
  for (let i = 0; i < max; i++) {
    diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  }
  return diff === 0;
}

function challenge(): Response {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Fortapac admin", charset="UTF-8"',
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  const isProtected = PROTECTED.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
  if (!isProtected) return next();

  // getSecret is the runtime accessor from astro:env, and the only one that
  // works here. import.meta.env and process.env are both empty inside
  // middleware during dev, and a named astro:env import is not generated for
  // this schema, so either would silently leave the gate open.
  const expected = getSecret("ADMIN_PASSWORD") ?? "";

  // Fail closed, everywhere, with no localhost exemption. An exemption would
  // mean the gate is never exercised in development, so a mistake in it only
  // ever surfaces in production, which is the wrong way round.
  if (!expected) {
    return new Response(
      "ADMIN_PASSWORD is not set, so the admin is closed. Add it to .env locally, or to the host's environment variables.",
      { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } },
    );
  }

  const header = context.request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return challenge();

  let decoded: string;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return challenge();
  }

  // Any username is accepted; only the password is checked.
  const password = decoded.slice(decoded.indexOf(":") + 1);
  if (!safeEqual(password, expected)) return challenge();

  const response = await next();
  response.headers.set("cache-control", "no-store");
  response.headers.set("x-robots-tag", "noindex, nofollow");
  return response;
});
