import { useLocale } from "../../i18n/useLocale";

export function HomeContent() {
  const { t } = useLocale();
  return (
    <main>
      <section className="hero">
        <picture className="hero-image">
          <source media="(max-width: 980px)" srcSet="/hero/mobile.jpg" />
          <img
            src="/hero/home.jpg"
            alt=""
            onLoad={(e) => {
              const ph = (e.currentTarget.closest("picture")?.nextElementSibling as HTMLElement | null);
              if (ph?.classList.contains("hero-placeholder")) ph.style.display = "none";
            }}
            onError={(e) => {
              const pic = e.currentTarget.closest("picture") as HTMLElement | null;
              if (pic) pic.style.display = "none";
            }}
          />
        </picture>
        <div className="hero-placeholder">
          <div className="label">{t("hero_photo_label")}</div>
        </div>
        <div className="hero-wrap hero-shell">
          <div className="hero-content">
            <h1>
              {t("hero_h1_a")}
              <br />
              {t("hero_h1_b")}
              <span style={{ color: "var(--orange)" }}>.</span>
            </h1>
            <p>{t("hero_p")}</p>
            <div className="hero-actions">
              <a className="button primary" href="#products">
                {t("hero_btn_explore")} <span className="arrow">→</span>
              </a>
              <a className="button dark" href="#contact">
                {t("hero_btn_quote")} <span className="arrow">→</span>
              </a>
            </div>
            <div className="made-in mono">
              <span className="flag"></span> {t("made_in")}
            </div>
          </div>
        </div>
      </section>

      <section id="products">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow mono">{t("products_eyebrow")}</div>
              <h2>{t("products_h2")}</h2>
            </div>
            <a className="view-link mono" href="#">
              {t("view_all")} <span className="arrow">→</span>
            </a>
          </div>
          <div className="products-grid">
            <article className="product-card">
              <div>
                <img className="product-image" src="/products/fibc-bulk-bags.png" alt="" loading="lazy" />
                <h3>{t("product_fibc_name")}</h3>
                <p>{t("product_fibc_card")}</p>
              </div>
              <div className="mono">{t("product_fibc_capacity")}</div>
            </article>
            <article className="product-card">
              <div>
                <img className="product-image" src="/products/pp-woven-sacks.png" alt="" loading="lazy" />
                <h3>{t("product_sacks_name")}</h3>
                <p>{t("product_sacks_card")}</p>
              </div>
              <div className="mono">{t("product_sacks_capacity")}</div>
            </article>
            <article className="product-card">
              <div>
                <img className="product-image" src="/products/forestry-covers.png" alt="" loading="lazy" />
                <h3>{t("product_forestry_name")}</h3>
                <p>{t("product_forestry_card")}</p>
              </div>
              <div className="mono">{t("product_forestry_capacity")}</div>
            </article>
            <article className="product-card">
              <div>
                <img className="product-image" src="/products/covers-liners.png" alt="" loading="lazy" />
                <h3>{t("product_covers_name")}</h3>
                <p>{t("product_covers_card")}</p>
              </div>
              <div className="mono">{t("product_covers_capacity")}</div>
            </article>
          </div>
        </div>
      </section>

      <div className="spec-row">
        <div className="wrap spec-grid">
          <div>
            <div className="eyebrow mono">{t("spec_eyebrow")}</div>
            <h2 style={{ fontSize: "clamp(2rem,3vw,3rem)" }}>{t("spec_h2")}</h2>
          </div>
          <div className="spec-card">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 22h28l5 32H13l5-32Z" />
                <path d="M24 22a8 8 0 0 1 16 0" />
              </g>
            </svg>
            <div className="spec-value">1,000–2,000 kg</div>
            <div className="mono">{t("spec_swl_range")}</div>
          </div>
          <div className="spec-card">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M32 8l20 8v13c0 13-8 22-20 27-12-5-20-14-20-27V16l20-8Z" />
                <path d="m23 31 6 6 13-15" />
              </g>
            </svg>
            <div className="spec-value">5:1</div>
            <div className="mono">{t("spec_safety_factor")}</div>
          </div>
          <div className="spec-card">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="32" cy="32" r="9" />
                <path d="M32 7v8M32 49v8M7 32h8M49 32h8M14 14l6 6M44 44l6 6M50 14l-6 6M20 44l-6 6" />
              </g>
            </svg>
            <div className="spec-value">UV</div>
            <div className="mono">{t("spec_stabilised")}</div>
          </div>
          <div className="spec-card">
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
            <div className="spec-value">100%</div>
            <div className="mono">{t("spec_recyclable")}</div>
          </div>
        </div>
      </div>

      <section id="industries" className="industries">
        <div className="wrap industry-layout">
          <div>
            <div className="eyebrow mono">{t("industries_eyebrow")}</div>
            <h2 style={{ fontSize: "2.35rem" }}>{t("industries_h2")}</h2>
            <a className="view-link mono" style={{ marginTop: "2rem" }} href="#">
              {t("industries_link")} <span className="arrow">→</span>
            </a>
          </div>
          <div className="industry-grid">
            {["industry_construction","industry_agriculture","industry_chemicals","industry_forestry","industry_logistics"].map((k) => (
              <article className="industry-card" key={k}>
                <div className="placeholder-image">{t(k as Parameters<typeof t>[0])}</div>
                <h3>{t(k as Parameters<typeof t>[0])}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="materials" className="material">
        <div className="material-grid">
          <div className="placeholder-fill">
            <div className="tag">{t("materials_weave_label")}</div>
          </div>
          <div className="material-copy">
            <div>
              <div className="eyebrow mono">{t("materials_eyebrow")}</div>
              <h2>{t("materials_h2")}</h2>
              <p style={{ margin: "1.25rem 0 1.75rem", maxWidth: "560px" }}>{t("materials_p")}</p>
              <a className="button light" href="#">
                {t("materials_link")} <span className="arrow">→</span>
              </a>
            </div>
            <div className="weave-diagram">
              <svg viewBox="0 0 240 240" aria-hidden="true">
                <g fill="none" stroke="#102A43" strokeWidth="5">
                  <path d="M45 25v170M75 25v170M105 25v170M135 25v170M165 25v170M195 25v170" />
                  <path d="M25 45h170M25 75h170M25 105h170M25 135h170M25 165h170M25 195h170" />
                </g>
                <path d="M150 60h55" stroke="#DE5B26" strokeWidth="4" />
                <path d="M150 160h55" stroke="#5E7790" strokeWidth="4" />
                <text x="154" y="53" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#102A43">{t("warp")}</text>
                <text x="154" y="153" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#102A43">{t("weft")}</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section id="sustainability" className="sustainability">
        <div className="sustainability-grid">
          <div>
            <div className="eyebrow mono">{t("sustainability_eyebrow")}</div>
            <h2 style={{ fontSize: "2.5rem" }}>{t("sustainability_h2")}</h2>
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
            <h3>{t("sus_reusable_h")}</h3>
            <p>{t("sus_reusable_p")}</p>
          </div>
          <div>
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M52 12C27 12 14 25 13 52c26-2 39-15 39-40Z" />
                <path d="M14 51c9-15 20-24 37-37" />
              </g>
            </svg>
            <h3>{t("sus_impact_h")}</h3>
            <p>{t("sus_impact_p")}</p>
          </div>
          <div>
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="32" cy="32" r="22" />
                <path d="M10 32h44M32 10c8 8 8 36 0 44M32 10c-8 8-8 36 0 44" />
              </g>
            </svg>
            <h3>{t("sus_lasts_h")}</h3>
            <p>{t("sus_lasts_p")}</p>
          </div>
          <div>
            <div className="placeholder-fill">
              <div className="tag">{t("sus_label")}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="cta">
        <div className="wrap cta-inner">
          <div className="woven-lines"></div>
          <div>
            <h2 style={{ fontSize: "2rem" }}>{t("cta_h2")}</h2>
            <p style={{ color: "rgba(255,255,255,.8)", maxWidth: "620px" }}>{t("cta_p")}</p>
          </div>
          <a className="button primary" href="mailto:hello@fortapac.se">
            {t("hero_btn_quote")} <span className="arrow">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
