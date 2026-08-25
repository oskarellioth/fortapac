import home from "../content/home.json";
import about from "../content/about.json";
import navigation from "../content/navigation.json";
import site from "../content/site.json";

export type Locale = "sv" | "en";

/** A field the team edits in both languages. */
export type Bilingual = { sv: string; en: string };

/** Pick the active language out of a bilingual field, falling back to Swedish. */
export function pick(value: Bilingual | undefined, locale: Locale): string {
  if (!value) return "";
  return value[locale] || value.sv || "";
}

// Keystatic writes one JSON file per entry. Vite's import.meta.glob picks them
// all up at build time, so adding a product in the admin is enough for it to
// appear on the site: nothing here needs a matching code change.
type ProductEntry = {
  order: number;
  name: Bilingual;
  menuBlurb: Bilingual;
  focusBlurb: Bilingual;
  cardBlurb: Bilingual;
  cardMeta: Bilingual;
  icon: string;
  photo: string;
  specs: Array<{ value: string; label: Bilingual }>;
};

type IndustryEntry = {
  order: number;
  name: Bilingual;
  blurb: Bilingual;
  icon: string;
  photo: string;
};

function loadCollection<T>(modules: Record<string, unknown>): Array<T & { key: string }> {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const key = path.split("/").pop()!.replace(/\.json$/, "");
      return { key, ...((mod as { default: T }).default ?? (mod as T)) };
    })
    .sort((a, b) => ((a as { order?: number }).order ?? 0) - ((b as { order?: number }).order ?? 0));
}

export const products = loadCollection<ProductEntry>(
  import.meta.glob("../content/products/*.json", { eager: true }),
);

export const industries = loadCollection<IndustryEntry>(
  import.meta.glob("../content/industries/*.json", { eager: true }),
);

export const content = { home, about, navigation, site };

/**
 * Locale-aware URLs. Slugs are translated, so the Swedish about page is
 * /om-oss rather than /en/about with a language toggle stapled on. Keeping the
 * mapping in one place means the language switcher can always find the twin of
 * whatever page it is on.
 */
export const ROUTES = {
  home: { sv: "/", en: "/en" },
  about: { sv: "/om-oss", en: "/en/about" },
} as const;

export type RouteKey = keyof typeof ROUTES;

export function routeKeyForPath(pathname: string): RouteKey | null {
  const p = pathname.replace(/\/+$/, "") || "/";
  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    if (p === ROUTES[key].sv.replace(/\/+$/, "") || p === ROUTES[key].en) return key;
  }
  if (p === "/" || p === "/en") return "home";
  return null;
}

/** Section anchors live on the home page, so links from /om-oss need the prefix. */
export function anchors(locale: Locale) {
  const base = locale === "sv" ? "" : "/en";
  return {
    products: `${base}/#products`,
    industries: `${base}/#industries`,
    materials: `${base}/#materials`,
    sustainability: `${base}/#sustainability`,
    contact: `${base}/#contact`,
  };
}
