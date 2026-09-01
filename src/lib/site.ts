/**
 * Where the site lives, and which hostnames may be indexed.
 *
 * Kept in one place because getting it wrong fails silently in the worst
 * direction: if a production hostname is missing from the list below, every
 * page on it serves noindex and the site simply never appears in search. That
 * is invisible until someone thinks to check months later.
 *
 * fortapac.se is primary. The brief calls for the .se ccTLD because it is a
 * genuine ranking signal for Swedish queries, and Sweden is the market.
 * fortapac.com is owned too and should redirect to .se rather than serve a
 * duplicate copy of the site.
 */

/** Canonical origin, used for canonical tags, hreflang and the sitemap. */
export const SITE_URL = import.meta.env.PUBLIC_SITE_URL || "https://staging.fortapac.com";

/**
 * Hostnames allowed to appear in search. Everything else, staging, Vercel
 * preview URLs and localhost, serves noindex.
 *
 * Deliberately an explicit list rather than "matches SITE_URL": staging has its
 * own canonical origin and must still stay out of the index.
 */
export const INDEXABLE_HOSTS = new Set([
  "fortapac.se",
  "www.fortapac.se",
  "fortapac.com",
  "www.fortapac.com",
]);

export function isIndexableHost(hostname: string): boolean {
  return INDEXABLE_HOSTS.has(hostname.toLowerCase());
}
