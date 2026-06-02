import { useLocation } from "@tanstack/react-router";
import { DEFAULT_LOCALE, STRINGS, type Locale, type StringKey } from "./strings";

/** Read the active locale from the current URL path. */
export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "sv";
}

export function useLocale() {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);

  function tr(key: StringKey): string {
    return STRINGS[key][locale];
  }

  return { locale, t: tr, otherLocale: (locale === "sv" ? "en" : "sv") as Locale };
}

export { DEFAULT_LOCALE };
