import type { APIRoute } from "astro";

/**
 * Generated rather than static, so the Sitemap line follows whichever domain
 * is serving. It was hardcoded to the .com while the site now also answers on
 * .se, which would have pointed crawlers at the wrong origin.
 *
 * AI crawlers are deliberately not blocked. Assistants that answer buying
 * questions, ChatGPT search, Perplexity, Google's AI overviews, can only cite
 * pages they are allowed to fetch, and being cited in an answer to "which FIBC
 * do I need for cement" is worth more here than withholding the content.
 * Blocking them is a choice available later by adding Disallow rules.
 */
export const GET: APIRoute = ({ site, url }) => {
  const origin = site?.origin ?? url.origin;

  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /keystatic",
    "Disallow: /translate",
    "Disallow: /api/",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
