import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ROUTES, type StringKey, routeKeyForPath } from "../../i18n/strings";
import { useLocale } from "../../i18n/useLocale";
import { rememberLocalePreference } from "../../i18n/geoRedirect";

// ───── Product catalogue (mega menu) ─────
// Each product has list-row strings, focus-panel strings, an image, a 4-spec
// strip for the focus panel, and optional list-icon fallback SVG used if the
// PNG isn't on disk yet.
type ProductSpec = {
  label: StringKey;
  value: string | StringKey;
};

const PRODUCT_KEYS: Array<{
  slug: string;
  nameKey: StringKey;
  shortKey: StringKey;
  focusKey: StringKey;
  image: string;
  focusPhoto?: string;
  fallbackIcon?: ReactNode;
  specs: ProductSpec[];
  detailHref?: string;
}> = [
  {
    slug: "fibc",
    nameKey: "product_fibc_name",
    shortKey: "product_fibc_short",
    focusKey: "product_fibc_focus",
    image: "/products/fibc-bulk-bags.png",
    focusPhoto: "/products/focus/fibc.jpg",
    specs: [
      { label: "spec_swl", value: "500–2 000 kg" },
      { label: "spec_safety_factor", value: "5:1" },
      { label: "spec_stabilised", value: "UV" },
      { label: "spec_recyclable", value: "100%" },
    ],
  },
  {
    slug: "sacks",
    nameKey: "product_sacks_name",
    shortKey: "product_sacks_short",
    focusKey: "product_sacks_focus",
    image: "/products/pp-woven-sacks.png",
    specs: [
      { label: "spec_swl", value: "10–100 kg" },
      { label: "spec_safety_factor", value: "5:1" },
      { label: "spec_stabilised", value: "UV" },
      { label: "spec_recyclable", value: "100%" },
    ],
  },
  {
    slug: "covers",
    nameKey: "product_forestry_name",
    shortKey: "product_forestry_short",
    focusKey: "product_forestry_focus",
    image: "/products/forestry-covers.png",
    specs: [
      { label: "spec_uv", value: "1,600 h" },
      { label: "spec_stabilised", value: "UV" },
      { label: "spec_material", value: "PP" },
      { label: "spec_recyclable", value: "100%" },
    ],
  },
  {
    slug: "liners",
    nameKey: "product_covers_name",
    shortKey: "product_covers_short",
    focusKey: "product_covers_focus",
    image: "/products/covers-liners.png",
    specs: [
      { label: "spec_material", value: "PE / PP" },
      { label: "spec_stabilised", value: "UV" },
      { label: "spec_safety_factor", value: "—" },
      { label: "spec_recyclable", value: "100%" },
    ],
  },
  {
    slug: "rolls",
    nameKey: "product_rolls_name",
    shortKey: "product_rolls_short",
    focusKey: "product_rolls_focus",
    image: "/products/woven-rolls.png",
    fallbackIcon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="32" cy="18" rx="20" ry="6" />
          <path d="M12 18v28c0 3.3 9 6 20 6s20-2.7 20-6V18" />
          <path d="M12 32c0 3.3 9 6 20 6s20-2.7 20-6" />
        </g>
      </svg>
    ),
    specs: [
      { label: "spec_material", value: "PP" },
      { label: "spec_stabilised", value: "UV" },
      { label: "spec_swl", value: "Bredd / Width" },
      { label: "spec_recyclable", value: "100%" },
    ],
  },
  {
    slug: "accessories",
    nameKey: "product_accessories_name",
    shortKey: "product_accessories_short",
    focusKey: "product_accessories_focus",
    image: "/products/accessories.png",
    fallbackIcon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 14a10 10 0 1 1 20 0v18" />
          <rect x="20" y="32" width="24" height="20" rx="3" />
          <path d="M32 38v8" />
        </g>
      </svg>
    ),
    specs: [
      { label: "spec_material", value: "PP / Steel" },
      { label: "spec_safety_factor", value: "—" },
      { label: "spec_stabilised", value: "UV" },
      { label: "spec_recyclable", value: "—" },
    ],
  },
];

// ───── Bottom addons strip with icons + 2-line text ─────
type Addon = {
  titleKey: StringKey;
  subKey: StringKey;
  iconSrc: string;
  fallbackIcon: ReactNode;
};

const ADDONS: Addon[] = [
  {
    titleKey: "addon_custom_sizes",
    subKey: "addon_custom_sub",
    iconSrc: "/icons/custom.png",
    fallbackIcon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="26" height="10" />
          <path d="M8 11v3M12 11v5M16 11v3M20 11v5M24 11v3" />
        </g>
      </svg>
    ),
  },
  {
    titleKey: "addon_printed_logos",
    subKey: "addon_print_sub",
    iconSrc: "/icons/print.png",
    fallbackIcon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 8h14v6H9z" />
          <rect x="5" y="14" width="22" height="10" rx="1" />
          <rect x="9" y="20" width="14" height="7" />
        </g>
      </svg>
    ),
  },
  {
    titleKey: "addon_uv_options",
    subKey: "addon_uv_sub",
    iconSrc: "/icons/uv.png",
    fallbackIcon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="16" r="5" />
          <path d="M16 3v3M16 26v3M3 16h3M26 16h3M6.3 6.3l2.1 2.1M23.6 23.6l2.1 2.1M25.7 6.3l-2.1 2.1M8.4 23.6l-2.1 2.1" />
        </g>
      </svg>
    ),
  },
  {
    titleKey: "addon_liners_coatings",
    subKey: "addon_liners_sub",
    iconSrc: "/icons/liners.png",
    fallbackIcon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10l12-5 12 5-12 5z" />
          <path d="M4 16l12 5 12-5" />
          <path d="M4 22l12 5 12-5" />
        </g>
      </svg>
    ),
  },
  {
    titleKey: "addon_tech_support",
    subKey: "addon_support_sub",
    iconSrc: "/icons/support.png",
    fallbackIcon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 18v-2a11 11 0 0 1 22 0v2" />
          <rect x="3" y="18" width="6" height="9" rx="1.5" />
          <rect x="23" y="18" width="6" height="9" rx="1.5" />
          <path d="M27 27v1a3 3 0 0 1-3 3h-3" />
        </g>
      </svg>
    ),
  },
];

// ───── Industries catalogue (mega menu) ─────
const INDUSTRY_KEYS: Array<{
  slug: string;
  nameKey: StringKey;
  descKey: StringKey;
  image: string;
  focusPhoto?: string;
  fallbackIcon: ReactNode;
}> = [
  {
    slug: "construction",
    nameKey: "industry_construction",
    descKey: "industry_construction_desc",
    image: "/icons/industries/construction.png",
    focusPhoto: "/products/focus/fibc.jpg",
    fallbackIcon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 54V18l24-6v42" />
          <path d="M14 18l24 28" />
          <path d="M44 54V30h12v24" />
          <path d="M44 30h12" />
        </g>
      </svg>
    ),
  },
  {
    slug: "agriculture",
    nameKey: "industry_agriculture",
    descKey: "industry_agriculture_desc",
    image: "/icons/industries/agriculture.png",
    fallbackIcon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 12v44" />
          <path d="M32 22c-6 0-10-4-10-10 6 0 10 4 10 10Z" />
          <path d="M32 22c6 0 10-4 10-10-6 0-10 4-10 10Z" />
          <path d="M32 34c-6 0-10-4-10-10 6 0 10 4 10 10Z" />
          <path d="M32 34c6 0 10-4 10-10-6 0-10 4-10 10Z" />
          <path d="M32 46c-6 0-10-4-10-10 6 0 10 4 10 10Z" />
          <path d="M32 46c6 0 10-4 10-10-6 0-10 4-10 10Z" />
        </g>
      </svg>
    ),
  },
  {
    slug: "chemicals",
    nameKey: "industry_chemicals",
    descKey: "industry_chemicals_desc",
    image: "/icons/industries/chemicals.png",
    fallbackIcon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 8h16" />
          <path d="M26 8v16L12 50a4 4 0 0 0 4 6h32a4 4 0 0 0 4-6L38 24V8" />
          <path d="M19 38h26" />
        </g>
      </svg>
    ),
  },
  {
    slug: "forestry",
    nameKey: "industry_forestry",
    descKey: "industry_forestry_desc",
    image: "/icons/industries/forestry.png",
    fallbackIcon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 8 18 28h6L14 44h36L40 28h6Z" />
          <path d="M32 44v12" />
        </g>
      </svg>
    ),
  },
  {
    slug: "mining",
    nameKey: "industry_mining_name",
    descKey: "industry_mining_desc",
    image: "/icons/industries/mining.png",
    fallbackIcon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 32h44l-4 14H14Z" />
          <path d="M14 32 22 14h20l8 18" />
          <circle cx="20" cy="50" r="4" />
          <circle cx="44" cy="50" r="4" />
        </g>
      </svg>
    ),
  },
  {
    slug: "logistics",
    nameKey: "industry_logistics_full",
    descKey: "industry_logistics_desc",
    image: "/icons/industries/logistics.png",
    fallbackIcon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="20" width="28" height="22" />
          <path d="M34 26h14l8 8v8H34" />
          <circle cx="18" cy="48" r="5" />
          <circle cx="44" cy="48" r="5" />
        </g>
      </svg>
    ),
  },
];

// Right-panel value-prop tiles (white-on-navy)
type ValueProp = {
  titleKey: StringKey;
  subKey: StringKey;
  iconSrc: string;
  fallbackIcon: ReactNode;
};

const INDUSTRY_VALUES: ValueProp[] = [
  {
    titleKey: "value_protects_title",
    subKey: "value_protects_sub",
    iconSrc: "/icons/val-protects.png",
    fallbackIcon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4 5 8v8c0 7 5 11 11 13 6-2 11-6 11-13V8Z" />
        </g>
      </svg>
    ),
  },
  {
    titleKey: "value_weather_title",
    subKey: "value_weather_sub",
    iconSrc: "/icons/val-weather.png",
    fallbackIcon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19a5 5 0 1 1 1-9.9 7 7 0 0 1 13 2.4A4.5 4.5 0 0 1 22 19Z" />
          <path d="M11 23v3M16 23v5M21 23v3" />
        </g>
      </svg>
    ),
  },
  {
    titleKey: "value_heavy_title",
    subKey: "value_heavy_sub",
    iconSrc: "/icons/val-heavy.png",
    fallbackIcon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 8a3 3 0 0 1 6 0v4h2V8a3 3 0 0 1 6 0v4h2" />
          <path d="M7 14h18l-2 14H9Z" />
        </g>
      </svg>
    ),
  },
  {
    titleKey: "value_sustainable_title",
    subKey: "value_sustainable_sub",
    iconSrc: "/icons/val-sustainable.png",
    fallbackIcon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M26 6c-13 0-20 7-20 20 13-1 20-8 20-20Z" />
          <path d="M7 26c4-8 10-13 19-19" />
        </g>
      </svg>
    ),
  },
];

// Bottom strip — industries variant
const INDUSTRY_ADDONS: Addon[] = [
  {
    titleKey: "ind_addon_custom",
    subKey: "ind_addon_custom_sub",
    iconSrc: "/icons/custom.png",
    fallbackIcon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="26" height="10" />
          <path d="M8 11v3M12 11v5M16 11v3M20 11v5M24 11v3" />
        </g>
      </svg>
    ),
  },
  {
    titleKey: "ind_addon_quality",
    subKey: "ind_addon_quality_sub",
    iconSrc: "/icons/quality.png",
    fallbackIcon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4 5 8v8c0 7 5 11 11 13 6-2 11-6 11-13V8Z" />
          <path d="m11 16 4 4 7-8" />
        </g>
      </svg>
    ),
  },
  {
    titleKey: "ind_addon_global",
    subKey: "ind_addon_global_sub",
    iconSrc: "/icons/global.png",
    fallbackIcon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="16" r="12" />
          <path d="M4 16h24M16 4c4 4 4 20 0 24M16 4c-4 4-4 20 0 24" />
        </g>
      </svg>
    ),
  },
  {
    titleKey: "ind_addon_support",
    subKey: "ind_addon_support_sub",
    iconSrc: "/icons/support.png",
    fallbackIcon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 18v-2a11 11 0 0 1 22 0v2" />
          <rect x="3" y="18" width="6" height="9" rx="1.5" />
          <rect x="23" y="18" width="6" height="9" rx="1.5" />
          <path d="M27 27v1a3 3 0 0 1-3 3h-3" />
        </g>
      </svg>
    ),
  },
];

// Render an image, swap to a fallback SVG node if the image fails to load.
function ImgWithFallback({
  src,
  fallback,
  className,
  alt = "",
}: {
  src: string;
  fallback: ReactNode;
  className?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}

export const FortapacMark = () => (
  <svg viewBox="0 0 212 44" xmlns="http://www.w3.org/2000/svg" aria-label="Fortapac logo">
    <g strokeLinecap="round" strokeWidth="4.8">
      <path d="M12 8V36" stroke="currentColor" />
      <path d="M22 8V36" stroke="currentColor" />
      <path d="M32 8V36" stroke="currentColor" />
      <path d="M5 13H39" stroke="currentColor" />
      <path d="M5 23H39" stroke="#DE5B26" />
      <path d="M5 33H39" stroke="currentColor" />
    </g>
    <text
      x="54"
      y="30"
      fontFamily="Arial Black, Archivo, sans-serif"
      fontSize="24"
      letterSpacing="-1"
      fill="currentColor"
    >
      FORTAPAC
    </text>
  </svg>
);

function LanguageSwitcher() {
  const { locale, otherLocale } = useLocale();
  const { pathname } = useLocation();

  const routeKey = routeKeyForPath(pathname);
  const target = routeKey ? ROUTES[routeKey][otherLocale] : ROUTES.home[otherLocale];

  return (
    <a
      href={target}
      className="lang-switch mono"
      onClick={() => rememberLocalePreference(otherLocale)}
      aria-label={otherLocale === "sv" ? "Byt språk till svenska" : "Switch language to English"}
    >
      <span className={locale === "sv" ? "on" : ""}>SV</span>
      <span className="sep">/</span>
      <span className={locale === "en" ? "on" : ""}>EN</span>
    </a>
  );
}

type OpenMega = null | "products" | "industries";

export function Header() {
  const { locale, t } = useLocale();
  const [openMega, setOpenMega] = useState<OpenMega>(null);
  const [activeProductIdx, setActiveProductIdx] = useState(0);
  const [activeIndustryIdx, setActiveIndustryIdx] = useState(0);
  const productsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMega(null);
    }
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;
      const insideProducts = productsRef.current?.contains(t);
      const insideIndustries = industriesRef.current?.contains(t);
      if (!insideProducts && !insideIndustries) {
        setOpenMega(null);
      }
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, []);

  const active = PRODUCT_KEYS[activeProductIdx];
  const activeIndustry = INDUSTRY_KEYS[activeIndustryIdx];
  const homePath = ROUTES.home[locale];
  const aboutPath = ROUTES.about[locale];
  const homePrefix = homePath === "/" ? "" : homePath;
  const productsHash = `${homePrefix}/#products`;
  const industriesHash = `${homePrefix}/#industries`;
  const materialsHash = `${homePrefix}/#materials`;
  const sustainabilityHash = `${homePrefix}/#sustainability`;
  const contactHash = `${homePrefix}/#contact`;

  function renderSpecValue(v: string | StringKey) {
    // If the value matches a StringKey, translate; otherwise render as-is.
    if (typeof v === "string" && v in (Object.fromEntries(Object.entries({ spec_stabilised: 1, spec_optional: 1 })) as Record<string, number>)) {
      return t(v as StringKey);
    }
    return v;
  }

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link to={homePath} className="brand">
          <FortapacMark />
        </Link>
        <nav className="nav">
          <div
            className={`mega-wrap ${openMega === "products" ? "open" : ""}`}
            ref={productsRef}
            onMouseEnter={() => setOpenMega("products")}
            onMouseLeave={() => setOpenMega(null)}
          >
            <button
              type="button"
              className="mega-trigger-btn"
              aria-haspopup="true"
              aria-expanded={openMega === "products"}
              onClick={() => setOpenMega((o) => (o === "products" ? null : "products"))}
            >
              {t("nav_products")}{" "}
              <span className="chev" aria-hidden="true">
                ▾
              </span>
            </button>
            {openMega === "products" && (
              <div className="mega" role="menu">
                <div className="mega-grid">
                  <div className="mega-intro">
                    <div className="eyebrow mono">{t("mega_eyebrow")}</div>
                    <h3>{t("mega_headline")}</h3>
                    <div className="rule" />
                    <p>{t("mega_intro")}</p>
                    <a className="button light" href={productsHash}>
                      {t("mega_view_all")} <span className="arrow">→</span>
                    </a>
                  </div>
                  <div className="mega-list">
                    {PRODUCT_KEYS.map((p, i) => (
                      <button
                        key={p.slug}
                        type="button"
                        className={`mega-item ${i === activeProductIdx ? "active" : ""}`}
                        onMouseEnter={() => setActiveProductIdx(i)}
                        onFocus={() => setActiveProductIdx(i)}
                        onClick={() => {
                          setOpenMega(null);
                          window.location.href = productsHash;
                        }}
                      >
                        <div className="mega-icon">
                          {p.fallbackIcon ? (
                            <ImgWithFallback src={p.image} fallback={p.fallbackIcon} />
                          ) : (
                            <img src={p.image} alt="" />
                          )}
                        </div>
                        <div>
                          <h4>{t(p.nameKey)}</h4>
                          <p>{t(p.shortKey)}</p>
                        </div>
                        <div className="arrow" aria-hidden="true">→</div>
                      </button>
                    ))}
                  </div>
                  <div className="mega-showcase">
                    {active.focusPhoto ? (
                      <div className="mega-photo has-image">
                        <img src={active.focusPhoto} alt={t(active.nameKey)} />
                      </div>
                    ) : (
                      <div className="mega-photo">
                        <div className="tag">{t("mega_product_photo")} · {t(active.nameKey)}</div>
                      </div>
                    )}
                    <div className="mega-focus-meta">
                      <span className="focus-badge mono">{t("mega_focus_badge")}</span>
                      <h4 className="focus-title">{t(active.nameKey)}</h4>
                      <p className="focus-blurb">{t(active.focusKey)}</p>
                      <a className="focus-link mono" href={active.detailHref || productsHash}>
                        {t("mega_focus_link")} <span aria-hidden="true">→</span>
                      </a>
                    </div>
                    <div className="mega-specs">
                      {active.specs.map((s, i) => (
                        <div key={i}>
                          <span className="val">{renderSpecValue(s.value)}</span>
                          <span className="label">{t(s.label)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mega-addons">
                  {ADDONS.map((a) => (
                    <div className="addon-item" key={a.titleKey}>
                      <span className="addon-icon">
                        <ImgWithFallback src={a.iconSrc} fallback={a.fallbackIcon} alt="" />
                      </span>
                      <div>
                        <span className="addon-title">{t(a.titleKey)}</span>
                        <span className="addon-sub">{t(a.subKey)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div
            className={`mega-wrap ${openMega === "industries" ? "open" : ""}`}
            ref={industriesRef}
            onMouseEnter={() => setOpenMega("industries")}
            onMouseLeave={() => setOpenMega(null)}
          >
            <button
              type="button"
              className="mega-trigger-btn"
              aria-haspopup="true"
              aria-expanded={openMega === "industries"}
              onClick={() => setOpenMega((o) => (o === "industries" ? null : "industries"))}
            >
              {t("nav_industries")}{" "}
              <span className="chev" aria-hidden="true">
                ▾
              </span>
            </button>
            {openMega === "industries" && (
              <div className="mega" role="menu">
                <div className="mega-grid">
                  <div className="mega-intro">
                    <div className="eyebrow mono">{t("ind_mega_eyebrow")}</div>
                    <h3>{t("ind_mega_headline")}</h3>
                    <div className="rule" />
                    <p>{t("ind_mega_intro")}</p>
                    <a className="button light" href={industriesHash}>
                      {t("ind_mega_view_all")} <span className="arrow">→</span>
                    </a>
                  </div>
                  <div className="mega-list">
                    {INDUSTRY_KEYS.map((ind, i) => (
                      <button
                        key={ind.slug}
                        type="button"
                        className={`mega-item ${i === activeIndustryIdx ? "active" : ""}`}
                        onMouseEnter={() => setActiveIndustryIdx(i)}
                        onFocus={() => setActiveIndustryIdx(i)}
                        onClick={() => {
                          setOpenMega(null);
                          window.location.href = industriesHash;
                        }}
                      >
                        <div className="mega-icon">
                          <ImgWithFallback src={ind.image} fallback={ind.fallbackIcon} />
                        </div>
                        <div>
                          <h4>{t(ind.nameKey)}</h4>
                          <p>{t(ind.descKey)}</p>
                        </div>
                        <div className="arrow" aria-hidden="true">→</div>
                      </button>
                    ))}
                  </div>
                  <div className="mega-showcase mega-showcase-values">
                    {activeIndustry.focusPhoto ? (
                      <div className="mega-photo has-image">
                        <img src={activeIndustry.focusPhoto} alt={t(activeIndustry.nameKey)} />
                      </div>
                    ) : (
                      <div className="mega-photo">
                        <div className="tag">{t("mega_product_photo")} · {t(activeIndustry.nameKey)}</div>
                      </div>
                    )}
                    <div className="mega-values">
                      {INDUSTRY_VALUES.map((v) => (
                        <div className="mega-value" key={v.titleKey}>
                          <span className="value-icon">
                            <ImgWithFallback src={v.iconSrc} fallback={v.fallbackIcon} alt="" />
                          </span>
                          <span className="value-title">{t(v.titleKey)}</span>
                          <span className="value-sub">{t(v.subKey)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mega-addons">
                  {INDUSTRY_ADDONS.map((a) => (
                    <div className="addon-item" key={a.titleKey}>
                      <span className="addon-icon">
                        <ImgWithFallback src={a.iconSrc} fallback={a.fallbackIcon} alt="" />
                      </span>
                      <div>
                        <span className="addon-title">{t(a.titleKey)}</span>
                        <span className="addon-sub">{t(a.subKey)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a href={materialsHash}>{t("nav_material")}</a>
          <a href={sustainabilityHash}>{t("nav_sustainability")}</a>
          <Link to={aboutPath}>{t("nav_about")}</Link>
          <a href={contactHash}>{t("nav_contact")}</a>
        </nav>
        <div className="header-right">
          <LanguageSwitcher />
          <a className="button primary header-cta" href={contactHash}>
            {t("cta_get_quote")} <span className="arrow">→</span>
          </a>
        </div>
        <button className="menu-button" aria-label={t("open_menu")}>☰</button>
      </div>
    </header>
  );
}
