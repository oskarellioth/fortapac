import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import keystatic from "@keystatic/astro";
import { loadEnv } from "vite";

// `site` has to be resolved here rather than read from import.meta.env, because
// the config file is evaluated before Astro's env is available. loadEnv reads
// the .env files the same way Vite does, and falls back to the real process
// environment on Vercel.
//
// This value drives every canonical tag, hreflang link, og:url and the sitemap,
// so a stale one points search engines at a domain the site no longer serves
// from. Keep the fallback matching wherever staging actually lives.
const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? "", process.cwd(), "");
const SITE = PUBLIC_SITE_URL || "https://staging.fortapac.se";

// Content pages are prerendered to static HTML at build time, which is what the
// brief asks for: best Core Web Vitals and the cleanest thing to hand a Swedish
// static host later. The Keystatic admin is the one exception and opts out of
// prerendering in its own route file, since it has to read and write on demand.
export default defineConfig({
  site: SITE,
  output: "static",
  adapter: vercel(),
  integrations: [
    react(),
    keystatic(),
  ],
  devToolbar: { enabled: false },
  // Declared here rather than read off import.meta.env, which does not reach
  // middleware in dev. astro:env resolves .env locally and the host's real
  // environment variables in production, through the same import.
  env: {
    schema: {
      ADMIN_PASSWORD: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      ANTHROPIC_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },
});
