export const site = {
  name: "DILAGOK",
  founder: "Dila Gök",
  origin: "Turkey",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dilagok.com",
  tagline: "Handmade cord couture. Knotted in Turkey, worn in Dubai, Paris, Berlin.",
  instagram: "https://www.instagram.com/dila_gok_/",
  instagramHandle: "@dila_gok_",
  email: "atelier@dilagok.com",
  productionWeeks: "2–4",
  locales: ["en", "ar", "fr", "de"] as const,
  defaultLocale: "en" as const,
  sameAs: [
    "https://www.instagram.com/dila_gok_/",
    "https://www.pinterest.com/dilagok/",
    "https://www.tiktok.com/@dilagok",
  ],
};

export type Locale = (typeof site.locales)[number];

export const localeDir: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
  fr: "ltr",
  de: "ltr",
};

export const localeOg: Record<Locale, string[]> = {
  en: ["en_GB", "en_AE"],
  ar: ["ar_AE"],
  fr: ["fr_FR"],
  de: ["de_DE"],
};

export const hreflangMap: { hrefLang: string; locale: Locale }[] = [
  { hrefLang: "en", locale: "en" },
  { hrefLang: "en-GB", locale: "en" },
  { hrefLang: "en-AE", locale: "en" },
  { hrefLang: "ar", locale: "ar" },
  { hrefLang: "ar-AE", locale: "ar" },
  { hrefLang: "fr-FR", locale: "fr" },
  { hrefLang: "de-DE", locale: "de" },
  { hrefLang: "x-default", locale: "en" },
];
