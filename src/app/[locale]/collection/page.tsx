import { getTranslations, setRequestLocale } from "next-intl/server";
import { products } from "@/lib/products";
import { Link } from "@/i18n/routing";
import { BagPortrait } from "@/components/product/BagPortrait";
import { JsonLd } from "@/components/seo/JsonLd";
import { hreflangAlternates, localeUrl } from "@/lib/seo";
import type { Locale } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "collection" });
  return {
    title: t("title"),
    description: t("lede"),
    alternates: hreflangAlternates("/collection"),
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("collection");

  return (
    <main className="mx-auto max-w-6xl px-5 pt-28 pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: t("title"),
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: localeUrl(loc, `/product/${p.slug}`),
            name: p.name[loc],
          })),
        }}
      />
      <h1 className="font-display text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-lg text-bone/70">{t("lede")}</p>
      <div className="editorial-grid mt-14">
        {products.map((p) => (
          <Link key={p.slug} href={`/product/${p.slug}`} className="block">
            <BagPortrait product={p} className="aspect-[4/5]" />
            <p className="mt-3 font-display text-2xl">{p.name[loc]}</p>
            <p className="text-sm text-bone/60">{p.summary[loc]}</p>
            <p className="mt-2 text-xs tracking-widest uppercase text-gold">
              {t("madeToOrder", { weeks: p.leadWeeks })}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
