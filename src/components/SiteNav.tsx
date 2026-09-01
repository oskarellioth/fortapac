import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Bilingual, Locale } from "../lib/content";
import { photo } from "../lib/images";

type Strip = { title: Bilingual; subtitle: Bilingual; icon: string };

export type NavProduct = {
  key: string;
  name: Bilingual;
  menuBlurb: Bilingual;
  focusBlurb: Bilingual;
  icon: string;
  photo: string;
  specs: Array<{ value: string; label: Bilingual }>;
};

export type NavIndustry = {
  key: string;
  name: Bilingual;
  blurb: Bilingual;
  icon: string;
  photo: string;
};

export type NavCopy = {
  navProducts: Bilingual;
  navIndustries: Bilingual;
  navMaterials: Bilingual;
  navSustainability: Bilingual;
  navAbout: Bilingual;
  navContact: Bilingual;
  ctaQuote: Bilingual;
  productsMegaHeading: Bilingual;
  productsMegaBody: Bilingual;
  productsMegaLink: Bilingual;
  productsMegaAddons: Strip[];
  industriesMegaHeading: Bilingual;
  industriesMegaBody: Bilingual;
  industriesMegaLink: Bilingual;
  industriesMegaValues: Strip[];
  industriesMegaAddons: Strip[];
};

type Props = {
  locale: Locale;
  copy: NavCopy;
  products: NavProduct[];
  industries: NavIndustry[];
  homePath: string;
  aboutPath: string;
  otherLocaleHref: string;
  anchors: Record<string, string>;
  productPhotoLabel: string;
  featuredLabel: string;
  featuredLinkLabel: string;
  menuLabel: string;
};

const t = (v: Bilingual | undefined, l: Locale) => (v ? v[l] || v.sv || "" : "");

/** Hides itself if the file is not on disk yet, so half-delivered icon sets
 *  leave a gap rather than a broken-image glyph. */
function Icon({ src, className }: { src: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <img
      src={src}
      alt=""
      className={className}
      width={64}
      height={64}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

const FortapacMark = () => (
  <svg viewBox="0 0 212 44" xmlns="http://www.w3.org/2000/svg" aria-label="Fortapac">
    <g strokeLinecap="round" strokeWidth="4.8">
      <path d="M12 8V36" stroke="currentColor" />
      <path d="M22 8V36" stroke="currentColor" />
      <path d="M32 8V36" stroke="currentColor" />
      <path d="M5 13H39" stroke="currentColor" />
      <path d="M5 23H39" stroke="#DE5B26" />
      <path d="M5 33H39" stroke="currentColor" />
    </g>
    <text x="54" y="30" fontFamily="Arial Black, Archivo, sans-serif" fontSize="24" letterSpacing="-1" fill="currentColor">
      FORTAPAC
    </text>
  </svg>
);

function StripRow({ items, locale }: { items: Strip[]; locale: Locale }) {
  return (
    <div className="mega-addons">
      {items.map((a, i) => (
        <div className="addon-item" key={i}>
          <span className="addon-icon">
            <Icon src={a.icon} />
          </span>
          <div>
            <span className="addon-title">{t(a.title, locale)}</span>
            <span className="addon-sub">{t(a.subtitle, locale)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Photo({ src, alt, placeholder }: { src: string; alt: string; placeholder: string }) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;
  const data = photo(src);
  return (
    <div className={`mega-photo ${showImage ? "has-image" : ""}`}>
      {showImage && (
        <img
          src={data.src}
          // Rendered at roughly 500px in the panel, so the candidates below the
          // full size are the ones that actually get used.
          srcSet={data.srcset || undefined}
          sizes="(max-width: 1200px) 40vw, 520px"
          alt={alt}
          width={data.width}
          height={data.height}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      <div className="tag">{placeholder}</div>
    </div>
  );
}

type OpenMega = null | "products" | "industries";

export default function SiteNav(props: Props) {
  const {
    locale, copy, products, industries, homePath, aboutPath,
    otherLocaleHref, anchors, productPhotoLabel, featuredLabel,
    featuredLinkLabel, menuLabel,
  } = props;

  const [openMega, setOpenMega] = useState<OpenMega>(null);
  const [productIdx, setProductIdx] = useState(0);
  const [industryIdx, setIndustryIdx] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<OpenMega>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMega(null);
        setMobileOpen(false);
      }
    }
    function onDown(e: MouseEvent) {
      const n = e.target as Node;
      if (!productsRef.current?.contains(n) && !industriesRef.current?.contains(n)) {
        setOpenMega(null);
      }
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, []);

  const product = products[productIdx];
  const industry = industries[industryIdx];

  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <a href={homePath} className="brand">
            <FortapacMark />
          </a>

          <nav className="nav">
            {/* Products */}
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
                {t(copy.navProducts, locale)} <span className="chev" aria-hidden="true">▾</span>
              </button>
              {openMega === "products" && product && (
                <div className="mega" role="menu">
                  <div className="mega-grid">
                    <div className="mega-intro">
                      <div className="eyebrow mono">{t(copy.navProducts, locale)}</div>
                      <h3>{t(copy.productsMegaHeading, locale)}</h3>
                      <div className="rule" />
                      <p>{t(copy.productsMegaBody, locale)}</p>
                      <a className="button light" href={anchors.products}>
                        {t(copy.productsMegaLink, locale)} <span className="arrow">→</span>
                      </a>
                    </div>
                    <div className="mega-list">
                      {products.map((p, i) => (
                        <button
                          key={p.key}
                          type="button"
                          className={`mega-item ${i === productIdx ? "active" : ""}`}
                          onMouseEnter={() => setProductIdx(i)}
                          onFocus={() => setProductIdx(i)}
                          onClick={() => {
                            setOpenMega(null);
                            window.location.href = anchors.products;
                          }}
                        >
                          <div className="mega-icon">
                            <Icon src={p.icon} />
                          </div>
                          <div>
                            <h4>{t(p.name, locale)}</h4>
                            <p>{t(p.menuBlurb, locale)}</p>
                          </div>
                          <div className="arrow" aria-hidden="true">→</div>
                        </button>
                      ))}
                    </div>
                    <div className="mega-showcase">
                      <Photo
                        src={product.photo}
                        alt={t(product.name, locale)}
                        placeholder={`${productPhotoLabel} · ${t(product.name, locale)}`}
                      />
                      <div className="mega-focus-meta">
                        <span className="focus-badge mono">{featuredLabel}</span>
                        <h4 className="focus-title">{t(product.name, locale)}</h4>
                        <p className="focus-blurb">{t(product.focusBlurb, locale)}</p>
                        <a className="focus-link mono" href={anchors.products}>
                          {featuredLinkLabel} <span aria-hidden="true">→</span>
                        </a>
                      </div>
                      <div className="mega-specs">
                        {product.specs?.map((s, i) => (
                          <div key={i}>
                            <span className="val">{s.value}</span>
                            <span className="label">{t(s.label, locale)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <StripRow items={copy.productsMegaAddons} locale={locale} />
                </div>
              )}
            </div>

            {/* Industries */}
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
                {t(copy.navIndustries, locale)} <span className="chev" aria-hidden="true">▾</span>
              </button>
              {openMega === "industries" && industry && (
                <div className="mega" role="menu">
                  <div className="mega-grid">
                    <div className="mega-intro">
                      <div className="eyebrow mono">{t(copy.navIndustries, locale)}</div>
                      <h3>{t(copy.industriesMegaHeading, locale)}</h3>
                      <div className="rule" />
                      <p>{t(copy.industriesMegaBody, locale)}</p>
                      <a className="button light" href={anchors.industries}>
                        {t(copy.industriesMegaLink, locale)} <span className="arrow">→</span>
                      </a>
                    </div>
                    <div className="mega-list">
                      {industries.map((ind, i) => (
                        <button
                          key={ind.key}
                          type="button"
                          className={`mega-item ${i === industryIdx ? "active" : ""}`}
                          onMouseEnter={() => setIndustryIdx(i)}
                          onFocus={() => setIndustryIdx(i)}
                          onClick={() => {
                            setOpenMega(null);
                            window.location.href = anchors.industries;
                          }}
                        >
                          <div className="mega-icon">
                            <Icon src={ind.icon} />
                          </div>
                          <div>
                            <h4>{t(ind.name, locale)}</h4>
                            <p>{t(ind.blurb, locale)}</p>
                          </div>
                          <div className="arrow" aria-hidden="true">→</div>
                        </button>
                      ))}
                    </div>
                    <div className="mega-showcase mega-showcase-values">
                      <Photo
                        src={industry.photo}
                        alt={t(industry.name, locale)}
                        placeholder={`${productPhotoLabel} · ${t(industry.name, locale)}`}
                      />
                      <div className="mega-values">
                        {copy.industriesMegaValues.map((v, i) => (
                          <div className="mega-value" key={i}>
                            <span className="value-icon">
                              <Icon src={v.icon} />
                            </span>
                            <span className="value-title">{t(v.title, locale)}</span>
                            <span className="value-sub">{t(v.subtitle, locale)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <StripRow items={copy.industriesMegaAddons} locale={locale} />
                </div>
              )}
            </div>

            <a href={anchors.materials}>{t(copy.navMaterials, locale)}</a>
            <a href={anchors.sustainability}>{t(copy.navSustainability, locale)}</a>
            <a href={aboutPath}>{t(copy.navAbout, locale)}</a>
            <a href={anchors.contact}>{t(copy.navContact, locale)}</a>
          </nav>

          <div className="header-right">
            <a href={otherLocaleHref} className="lang-switch mono">
              <span className={locale === "sv" ? "on" : ""}>SV</span>
              <span className="sep">/</span>
              <span className={locale === "en" ? "on" : ""}>EN</span>
            </a>
            <a className="button primary header-cta" href={anchors.contact}>
              {t(copy.ctaQuote, locale)} <span className="arrow">→</span>
            </a>
          </div>

          <button
            type="button"
            className="menu-button"
            aria-label={menuLabel}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-nav" role="dialog" aria-modal="true">
          <div className="mobile-nav-inner">
            <button
              type="button"
              className={`mobile-row ${mobileSection === "products" ? "open" : ""}`}
              onClick={() => setMobileSection((s) => (s === "products" ? null : "products"))}
              aria-expanded={mobileSection === "products"}
            >
              <span>{t(copy.navProducts, locale)}</span>
              <span className="mobile-chev" aria-hidden="true">▾</span>
            </button>
            {mobileSection === "products" && (
              <ul className="mobile-sub">
                {products.map((p) => (
                  <li key={p.key}>
                    <a href={anchors.products} onClick={() => setMobileOpen(false)}>
                      {t(p.name, locale)}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              className={`mobile-row ${mobileSection === "industries" ? "open" : ""}`}
              onClick={() => setMobileSection((s) => (s === "industries" ? null : "industries"))}
              aria-expanded={mobileSection === "industries"}
            >
              <span>{t(copy.navIndustries, locale)}</span>
              <span className="mobile-chev" aria-hidden="true">▾</span>
            </button>
            {mobileSection === "industries" && (
              <ul className="mobile-sub">
                {industries.map((ind) => (
                  <li key={ind.key}>
                    <a href={anchors.industries} onClick={() => setMobileOpen(false)}>
                      {t(ind.name, locale)}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <a className="mobile-row" href={anchors.materials}>
              <span>{t(copy.navMaterials, locale)}</span>
            </a>
            <a className="mobile-row" href={anchors.sustainability}>
              <span>{t(copy.navSustainability, locale)}</span>
            </a>
            <a className="mobile-row" href={aboutPath}>
              <span>{t(copy.navAbout, locale)}</span>
            </a>
            <a className="mobile-row" href={anchors.contact}>
              <span>{t(copy.navContact, locale)}</span>
            </a>

            <div className="mobile-foot">
              <a href={otherLocaleHref} className="lang-switch mono">
                <span className={locale === "sv" ? "on" : ""}>SV</span>
                <span className="sep">/</span>
                <span className={locale === "en" ? "on" : ""}>EN</span>
              </a>
              <a className="button primary" href={anchors.contact}>
                {t(copy.ctaQuote, locale)} <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
