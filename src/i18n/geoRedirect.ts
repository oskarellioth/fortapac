/**
 * One-shot, client-side IP geolocation. If the visitor is *not* in Sweden,
 * the Swedish default at "/" doesn't suit them; redirect to "/en".
 * Conversely, a Swedish IP arriving at "/en" via a shared link could be
 * redirected to "/", but we don't do that — users who picked English by URL
 * stay in English.
 *
 * Mechanics:
 *   - Runs only in the browser, only once per session (sessionStorage flag).
 *   - Skips entirely if the user has previously chosen a locale via the
 *     switcher (localStorage flag).
 *   - Uses ipapi.co/json/ (free tier, no auth, ~30k req/month). Caller's
 *     IP only — no API key, no PII beyond what their browser already sends.
 *   - Server-side rendering (e.g. Cloudflare cf-ipcountry) is the production
 *     path; we'll move there in the Astro migration. This is a v1 stop-gap.
 */

const SESSION_KEY = "fortapac:geo-checked";
const PREF_KEY = "fortapac:locale-pref";

export function rememberLocalePreference(locale: "sv" | "en") {
  try {
    localStorage.setItem(PREF_KEY, locale);
  } catch {
    /* private mode etc. — ignore */
  }
}

export async function maybeGeoRedirect(currentPath: string): Promise<void> {
  if (typeof window === "undefined") return;

  // Already checked this session — don't pester.
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return;
  } catch {
    return;
  }

  // User has explicitly picked a locale before — respect that, never override.
  try {
    if (localStorage.getItem(PREF_KEY)) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }
  } catch {
    /* fall through */
  }

  // Only intervene when the visitor lands on the Swedish root paths.
  // English visitors who arrived at /en/* stay where they are.
  const onSwedishRoot = currentPath === "/" || currentPath === "/om-oss";
  if (!onSwedishRoot) {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    return;
  }

  try {
    const res = await fetch("https://ipapi.co/json/", {
      // Tight budget; we don't want a slow third party blocking UX.
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as { country_code?: string };
    const country = (data.country_code || "").toUpperCase();

    sessionStorage.setItem(SESSION_KEY, "1");

    if (country && country !== "SE") {
      // Map sv path → en path
      const target = currentPath === "/om-oss" ? "/en/about" : "/en";
      window.location.replace(target);
    }
  } catch {
    // Network blocked, ad-blocker, timeout — silently give up. Worst case the
    // visitor sees Swedish; the language switcher in the header lets them flip.
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  }
}
