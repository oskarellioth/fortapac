import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../../components/site/SiteLayout";
import { HomeContent } from "../../components/site/HomeContent";
import { STRINGS } from "../../i18n/strings";

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: [
      { title: STRINGS.home_title.en },
      { name: "description", content: STRINGS.home_meta.en },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "sv_SE" },
    ],
    links: [
      { rel: "canonical", href: "/en" },
      { rel: "alternate", hrefLang: "sv", href: "/" },
      { rel: "alternate", hrefLang: "en", href: "/en" },
      { rel: "alternate", hrefLang: "x-default", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=IBM+Plex+Mono:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <HomeContent />
    </SiteLayout>
  );
}
