import { useLocale } from "../../i18n/useLocale";

// Tiny inline markdown-ish: turn **x** into <strong>x</strong>.
function renderEmphasised(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function AboutContent() {
  const { t } = useLocale();
  return (
    <main>
      <section className="about-hero">
        <div className="wrap">
          <div className="eyebrow mono">{t("about_eyebrow")}</div>
          <h1>
            {t("about_h1_a")}
            <br />
            {t("about_h1_b")}
            <span>.</span>
          </h1>
          <p>{t("about_hero_p")}</p>
        </div>
      </section>

      <section className="about-pillars-section">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <div>
              <div className="eyebrow mono">{t("about_pillars_eyebrow")}</div>
              <h2 style={{ fontSize: "clamp(2rem,3vw,2.75rem)" }}>{t("about_pillars_h2")}</h2>
            </div>
          </div>
          <div className="about-pillars-grid">
            <div className="about-pillar">
              <span className="num">{t("pillar1_num")}</span>
              <h3>{t("pillar1_h")}</h3>
              <p>{t("pillar1_p")}</p>
            </div>
            <div className="about-pillar">
              <span className="num">{t("pillar2_num")}</span>
              <h3>{t("pillar2_h")}</h3>
              <p>{t("pillar2_p")}</p>
            </div>
            <div className="about-pillar">
              <span className="num">{t("pillar3_num")}</span>
              <h3>{t("pillar3_h")}</h3>
              <p>{t("pillar3_p")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="wrap">
          <div className="about-story-grid">
            <div>
              <div className="eyebrow mono">{t("about_story_eyebrow")}</div>
              <h2>{t("about_story_h2")}</h2>
              <div className="rule" />
            </div>
            <div>
              <p>{t("about_story_p1")}</p>
              <p>{renderEmphasised(t("about_story_p2_sv"))}</p>
              <p>{t("about_story_p3")}</p>
              <p>{t("about_story_p4")}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="cta">
        <div className="wrap cta-inner">
          <div className="woven-lines"></div>
          <div>
            <h2 style={{ fontSize: "2rem" }}>{t("about_cta_h2")}</h2>
            <p style={{ color: "rgba(255,255,255,.8)", maxWidth: "620px" }}>{t("about_cta_p")}</p>
          </div>
          <a className="button primary" href="mailto:hello@fortapac.se">
            {t("about_cta_btn")} <span className="arrow">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
