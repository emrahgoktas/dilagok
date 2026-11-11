import { hreflangMap, site, type Locale } from "./site";

export function localeUrl(locale: Locale, path = "") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}/${locale}${clean === "/" ? "" : clean}`;
}

export function hreflangAlternates(path = "") {
  const languages: Record<string, string> = {};
  for (const { hrefLang, locale } of hreflangMap) {
    languages[hrefLang] = localeUrl(locale, path);
  }
  return { canonical: localeUrl("en", path), languages };
}
