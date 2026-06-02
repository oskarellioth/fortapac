import { Link } from "@tanstack/react-router";
import { FortapacMark } from "./Header";
import { useLocale } from "../../i18n/useLocale";
import { ROUTES } from "../../i18n/strings";

export function Footer() {
  const { locale, t } = useLocale();
  const homePath = ROUTES.home[locale];
  const aboutPath = ROUTES.about[locale];
  const productsHash = `${homePath === "/" ? "" : homePath}/#products`;
  const industriesHash = `${homePath === "/" ? "" : homePath}/#industries`;
  const sustainabilityHash = `${homePath === "/" ? "" : homePath}/#sustainability`;

  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Link to={homePath} className="brand" style={{ color: "var(--navy)" }}>
            <FortapacMark />
          </Link>
          <p>{t("footer_blurb")}</p>
          <div className="made-in mono" style={{ color: "var(--navy)", marginTop: "1.5rem" }}>
            <span className="flag"></span> {t("made_in")}
          </div>
        </div>
        <div>
          <h4>{t("footer_col_products")}</h4>
          <a href={productsHash}>{t("product_fibc_name")}</a>
          <a href={productsHash}>{t("product_sacks_name")}</a>
          <a href={productsHash}>{t("product_forestry_name")}</a>
          <a href={productsHash}>{t("product_covers_name")}</a>
        </div>
        <div>
          <h4>{t("footer_col_industries")}</h4>
          <a href={industriesHash}>{t("industry_construction")}</a>
          <a href={industriesHash}>{t("industry_agriculture")}</a>
          <a href={industriesHash}>{t("industry_chemicals")}</a>
          <a href={industriesHash}>{t("industry_forestry")}</a>
          <a href={industriesHash}>{t("industry_logistics")}</a>
        </div>
        <div>
          <h4>{t("footer_col_company")}</h4>
          <Link to={aboutPath}>{t("footer_about_link")}</Link>
          <a href={sustainabilityHash}>{t("nav_sustainability")}</a>
          <a href="#">{t("footer_quality")}</a>
          <a href="#">{t("footer_resources")}</a>
        </div>
        <div>
          <h4>{t("footer_col_contact")}</h4>
          <p>Fortapac AB</p>
          <p>Göteborg, Sweden</p>
          <a href="mailto:hello@fortapac.se">hello@fortapac.se</a>
        </div>
        <div>
          <h4>{t("footer_col_newsletter")}</h4>
          <p>{t("footer_newsletter_p")}</p>
          <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={t("footer_email_placeholder")} />
            <button type="submit">→</button>
          </form>
        </div>
      </div>
      <div className="copyright">
        <div className="wrap">
          <span>{t("footer_copyright")}</span>
          <span>
            <a href="#">{t("footer_privacy")}</a>
            <a href="#">{t("footer_terms")}</a>
            <a href="#">{t("footer_cookies")}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
