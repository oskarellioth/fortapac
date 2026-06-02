import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ROUTES, type StringKey } from "../../i18n/strings";
import { useLocale } from "../../i18n/useLocale";
import { rememberLocalePreference } from "../../i18n/geoRedirect";
import { routeKeyForPath } from "../../i18n/strings";

// Same product images for all locales; descriptions translate via the dictionary.
const PRODUCT_KEYS: Array<{
  slug: string;
  nameKey: StringKey;
  blurbKey: StringKey;
  image: string;
  specs: { swl: { sv: string; en: string }; sf: string; uv: StringKey | string; material: string };
}> = [
  {
    slug: "fibc",
    nameKey: "product_fibc_name",
    blurbKey: "product_fibc_short",
    image: "/products/fibc-bulk-bags.png",
    specs: { swl: { sv: "1 000 KG", en: "1,000 KG" }, sf: "5:1", uv: "spec_stabilised", material: "PP" },
  },
  {
    slug: "sacks",
    nameKey: "product_sacks_name",
    blurbKey: "product_sacks_short",
    image: "/products/pp-woven-sacks.png",
    specs: { swl: { sv: "10–100 KG", en: "10–100 KG" }, sf: "5:1", uv: "spec_optional", material: "PP" },
  },
  {
    slug: "forestry",
    nameKey: "product_forestry_name",
    blurbKey: "product_forestry_short",
    image: "/products/forestry-covers.png",
    specs: { swl: { sv: "—", en: "—" }, sf: "—", uv: "1,600 h", material: "PP" },
  },
  {
    slug: "covers",
    nameKey: "product_covers_name",
    blurbKey: "product_covers_short",
    image: "/products/covers-liners.png",
    specs: { swl: { sv: "—", en: "—" }, sf: "—", uv: "spec_stabilised", material: "PP / PE" },
  },
];

const ADDON_KEYS: StringKey[] = [
  "addon_custom_sizes",
  "addon_printed_logos",
  "addon_uv_options",
  "addon_liners_coatings",
  "addon_tech_support",
];

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
  // Default fallback: home of the other locale.
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

export function Header() {
  const { locale, t } = useLocale();
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMegaOpen(false);
    }
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, []);

  const active = PRODUCT_KEYS[activeIdx];
  const homePath = ROUTES.home[locale];
  const aboutPath = ROUTES.about[locale];
  const productsHash = `${homePath === "/" ? "" : homePath}/#products`;
  const industriesHash = `${homePath === "/" ? "" : homePath}/#industries`;
  const sustainabilityHash = `${homePath === "/" ? "" : homePath}/#sustainability`;
  const contactHash = `${homePath === "/" ? "" : homePath}/#contact`;

  const renderUv = (val: string) =>
    val === "spec_stabilised" || val === "spec_optional"
      ? t(val as StringKey)
      : val;

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link to={homePath} className="brand">
          <FortapacMark />
        </Link>
        <nav className="nav">
          <div
            className={`mega-wrap ${megaOpen ? "open" : ""}`}
            ref={wrapRef}
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              type="button"
              className="mega-trigger-btn"
              aria-haspopup="true"
              aria-expanded={megaOpen}
              onClick={() => setMegaOpen((o) => !o)}
            >
              {t("nav_products")}{" "}
              <span className="chev" aria-hidden="true">
                ▾
              </span>
            </button>
            {megaOpen && (
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
                        className={`mega-item ${i === activeIdx ? "active" : ""}`}
                        onMouseEnter={() => setActiveIdx(i)}
                        onFocus={() => setActiveIdx(i)}
                        onClick={() => {
                          setMegaOpen(false);
                          window.location.href = productsHash;
                        }}
                      >
                        <div className="mega-icon">
                          <img src={p.image} alt="" />
                        </div>
                        <div>
                          <h4>{t(p.nameKey)}</h4>
                          <p>{t(p.blurbKey)}</p>
                        </div>
                        <div className="arrow" aria-hidden="true">→</div>
                      </button>
                    ))}
                  </div>
                  <div className="mega-showcase">
                    <div className="mega-photo">
                      <div className="tag">{t("mega_product_photo")} · {t(active.nameKey)}</div>
                    </div>
                    <div className="mega-specs">
                      <div>
                        <svg viewBox="0 0 64 64" aria-hidden="true">
                          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 22h28l5 32H13l5-32Z" />
                            <path d="M24 22a8 8 0 0 1 16 0" />
                          </g>
                        </svg>
                        <span className="label">{t("spec_swl")}</span>
                        <span className="val">{active.specs.swl[locale]}</span>
                      </div>
                      <div>
                        <svg viewBox="0 0 64 64" aria-hidden="true">
                          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M32 8l20 8v13c0 13-8 22-20 27-12-5-20-14-20-27V16l20-8Z" />
                            <path d="m23 31 6 6 13-15" />
                          </g>
                        </svg>
                        <span className="label">{t("spec_safety_factor")}</span>
                        <span className="val">{active.specs.sf}</span>
                      </div>
                      <div>
                        <svg viewBox="0 0 64 64" aria-hidden="true">
                          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="32" cy="32" r="9" />
                            <path d="M32 7v8M32 49v8M7 32h8M49 32h8M14 14l6 6M44 44l6 6M50 14l-6 6M20 44l-6 6" />
                          </g>
                        </svg>
                        <span className="label">{t("spec_uv")}</span>
                        <span className="val">{renderUv(active.specs.uv)}</span>
                      </div>
                      <div>
                        <svg viewBox="0 0 64 64" aria-hidden="true">
                          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M25 14l7-7 7 7" />
                            <path d="M32 7v17" />
                            <path d="M47 37l3 10-10 3" />
                            <path d="M50 47 36 39" />
                            <path d="M17 50 7 47l3-10" />
                            <path d="M7 47l14-8" />
                          </g>
                        </svg>
                        <span className="label">{t("spec_material")}</span>
                        <span className="val">{active.specs.material}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mega-addons">
                  {ADDON_KEYS.map((key, i) => (
                    <span key={key}>
                      {t(key)}
                      {i < ADDON_KEYS.length - 1 && <em className="dot">•</em>}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a href={industriesHash}>{t("nav_industries")}</a>
          <Link to={aboutPath}>{t("nav_about")}</Link>
          <a href={sustainabilityHash}>{t("nav_sustainability")}</a>
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
