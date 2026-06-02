import type { ReactNode } from "react";
import { SITE_CSS } from "./styles";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
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
