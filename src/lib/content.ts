import home from "../content/home.json";
import about from "../content/about.json";
import navigation from "../content/navigation.json";
import site from "../content/site.json";

export type Locale = "sv" | "en";

/**
 * Keystatic's image fields store a bare filename and prepend `publicPath`
 * themselves when rendering the admin. Storing a full path in the JSON makes
 * the field fail validation, which blanks the entire entry in the CMS, so the
 * content files keep filenames only and the prefix is reattached here.
 *
 * These must stay in step with the `publicPath` values in keystatic.config.ts.
 */
export const MEDIA = {
  hero: "/hero/",
  icons: "/icons/",
  industryIcons: "/icons/industries/",
  productIcons: "/products/",
  productPhotos: "/products/focus/",
  industryPhotos: "/industries/focus/",
} as const;

/** Empty stays empty, so callers can treat "" as "no image yet". */
export function media(prefix: string, filename: string | undefined): string {
  if (!filename) return "";
  // Tolerate a full path, in case one is pasted in by hand.
  if (filename.startsWith("/")) return filename;
  return prefix + filename;
}

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

// Filenames are resolved to public paths once, here, so every component can
// treat entry.icon / entry.photo as something it can put straight into src.
export const products = loadCollection<ProductEntry>(
  import.meta.glob("../content/products/*.json", { eager: true }),
).map((p) => ({
  ...p,
  icon: media(MEDIA.productIcons, p.icon),
  photo: media(MEDIA.productPhotos, p.photo),
}));

export const industries = loadCollection<IndustryEntry>(
  import.meta.glob("../content/industries/*.json", { eager: true }),
).map((i) => ({
  ...i,
  icon: media(MEDIA.industryIcons, i.icon),
  photo: media(MEDIA.industryPhotos, i.photo),
}));

export type LegalEntry = {
  key: string;
  order: number;
  title: Bilingual;
  intro: Bilingual;
  lastUpdated: string;
  sections: Array<{ heading: Bilingual; body: Bilingual }>;
};

export const legal = loadCollection<LegalEntry>(
  import.meta.glob("../content/legal/*.json", { eager: true }),
);

export function legalByKey(key: string): LegalEntry | undefined {
  return legal.find((l) => l.key === key);
}

type Strip = { icon: string; [k: string]: unknown };
const withIcons = (items: Strip[] | undefined, prefix: string) =>
  (items ?? []).map((item) => ({ ...item, icon: media(prefix, item.icon) }));

const navigationResolved = {
  ...navigation,
  productsMegaAddons: withIcons(navigation.productsMegaAddons as Strip[], MEDIA.icons),
  industriesMegaValues: withIcons(navigation.industriesMegaValues as Strip[], MEDIA.icons),
  industriesMegaAddons: withIcons(navigation.industriesMegaAddons as Strip[], MEDIA.icons),
};

const homeResolved = {
  ...home,
  heroImage: media(MEDIA.hero, home.heroImage),
  heroImageMobile: media(MEDIA.hero, home.heroImageMobile),
};

export const content = {
  home: homeResolved,
  about,
  navigation: navigationResolved,
  site,
};

/**
 * Locale-aware URLs. Slugs are translated, so the Swedish about page is
 * /om-oss rather than /en/about with a language toggle stapled on. Keeping the
 * mapping in one place means the language switcher can always find the twin of
 * whatever page it is on.
 */
export const ROUTES = {
  home: { sv: "/", en: "/en" },
  about: { sv: "/om-oss", en: "/en/about" },
  privacy: { sv: "/integritetspolicy", en: "/en/privacy" },
  terms: { sv: "/anvandarvillkor", en: "/en/terms" },
  cookies: { sv: "/cookies", en: "/en/cookies" },
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
