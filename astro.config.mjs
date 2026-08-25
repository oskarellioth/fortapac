import { defineConfig } from "astro/config";
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
  integrations: [react(), keystatic()],
  devToolbar: { enabled: false },
});
