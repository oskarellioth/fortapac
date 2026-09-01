import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import keystatic from "@keystatic/astro";

// Content pages are prerendered to static HTML at build time, which is what the
// brief asks for: best Core Web Vitals and the cleanest thing to hand a Swedish
// static host later. The Keystatic admin is the one exception and opts out of
// prerendering in its own route file, since it has to read and write on demand.
export default defineConfig({
  site: "https://staging.fortapac.com",
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
