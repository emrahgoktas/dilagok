import type { Locale } from "./site";

export function emptyLocale(): Record<Locale, string> {
  return { en: "", ar: "", fr: "", de: "" };
}

export function emptyLocaleList(): Record<Locale, string[]> {
  return { en: [], ar: [], fr: [], de: [] };
}
