import { useEffect, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { SITE_CSS } from "./styles";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { maybeGeoRedirect } from "../../i18n/geoRedirect";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    maybeGeoRedirect(pathname);
    // Only fire on first mount; geoRedirect itself is idempotent per session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SITE_CSS }} />
      <div className="fortapac">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
