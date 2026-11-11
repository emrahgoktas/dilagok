import { getTranslations, setRequestLocale } from "next-intl/server";
import { SignatureHero } from "@/components/scene/SignatureHero";
import { products } from "@/lib/products";
import { Link } from "@/i18n/routing";
import { ProductMedia } from "@/components/product/ProductMedia";
import { hreflangAlternates } from "@/lib/seo";
import type { Locale } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: hreflangAlternates(""),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("collection");

  return (
    <main>
      <SignatureHero />
      <section className="mx-auto max-w-6xl px-5 py-24">
        <p className="text-[0.65rem] tracking-[0.35em] uppercase text-gold">Capsule</p>
        <h2 className="mt-4 font-display text-4xl md:text-6xl">{t("title")}</h2>
        <p className="mt-4 max-w-xl text-bone/70">{t("lede")}</p>
        <div className="editorial-grid mt-14">
          {products.map((p) => (
            <Link key={p.slug} href={`/product/${p.slug}`} className="group block">
              <ProductMedia product={p} className="aspect-[4/5]" />
              <div className="mt-4 flex items-baseline justify-between">
                <span className="font-display text-2xl">{p.name[loc]}</span>
                <span className="text-xs tracking-widest uppercase text-bone/50">
                  {p.silhouette}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
