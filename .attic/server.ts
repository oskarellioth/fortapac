import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} , try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

// Only the real production hostnames may be indexed. Everything else, staging,
// *.vercel.app preview URLs, localhost, is served noindex so it can never
// compete with the live site in search results. Host-based rather than
// env-based so it stays correct without anyone remembering to flip a flag:
// pointing the production domain at a deployment is what turns indexing on.
const INDEXABLE_HOSTS = new Set(["fortapac.com", "www.fortapac.com"]);

function isIndexable(request: Request): boolean {
  try {
    return INDEXABLE_HOSTS.has(new URL(request.url).hostname.toLowerCase());
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const indexable = isIndexable(request);

      // Keep crawlers off non-production hosts entirely, not just out of the index.
      if (!indexable && new URL(request.url).pathname === "/robots.txt") {
        return new Response("User-agent: *\nDisallow: /\n", {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "x-robots-tag": "noindex, nofollow",
          },
        });
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);

      if (indexable) return normalized;

      // Response headers can be immutable, so clone before mutating.
      const headers = new Headers(normalized.headers);
      headers.set("x-robots-tag", "noindex, nofollow");
      return new Response(normalized.body, {
        status: normalized.status,
        statusText: normalized.statusText,
        headers,
      });
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
