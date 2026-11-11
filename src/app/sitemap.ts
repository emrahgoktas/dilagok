import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { journal } from "@/lib/journal";
import { markets } from "@/lib/markets";
import { localeUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/collection",
    "/atelier",
    "/lookbook",
    "/faq",
    "/journal",
    "/shipping",
    ...products.map((p) => `/product/${p.slug}`),
    ...products.map((p) => `/custom/${p.slug}`),
    ...journal.map((a) => `/journal/${a.slug}`),
    ...Object.keys(markets).map((m) => `/shipping/${m}`),
  ];

  return paths.flatMap((path) =>
    site.locales.map((locale) => ({
      url: localeUrl(locale, path),
      alternates: {
        languages: Object.fromEntries(
          site.locales.map((l) => [l, localeUrl(l, path)]),
        ),
      },
    })),
  );
}
