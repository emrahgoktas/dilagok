import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cordPalette, customSurcharge } from "@/lib/products";
import { allProducts, getProduct } from "@/lib/catalog-store";
import { CustomForm } from "@/components/product/CustomForm";
import { ProductMedia } from "@/components/product/ProductMedia";
import { hreflangAlternates } from "@/lib/seo";
import { site, type Locale } from "@/lib/site";
import type { Metadata } from "next";

export const dynamicParams = true;

export function generateStaticParams() {
  return allProducts().flatMap((p) =>
    site.locales.map((locale) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const loc = locale as Locale;
  return {
    title: `Custom ${product.name[loc]}`,
    description: product.summary[loc],
    alternates: hreflangAlternates(`/custom/${slug}`),
  };
}

export default async function CustomPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProduct(slug);
  if (!product) notFound();
  const loc = locale as Locale;
  const t = await getTranslations("custom");

  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-5 pt-28 pb-24 md:grid-cols-2">
      <ProductMedia product={product} className="aspect-[4/5]" />
      <div>
        <h1 className="font-display text-5xl">{t("title")}</h1>
        <p className="mt-4 text-bone/70">{t("lede")}</p>
        <p className="mt-2 font-display text-3xl">{product.name[loc]}</p>
        <CustomForm
          product={product}
          colors={product.colors.map((c) => ({
            id: c,
            hex: cordPalette[c].hex,
            label: cordPalette[c].label[loc],
          }))}
          sizes={product.sizes}
          straps={product.straps}
          surcharge={customSurcharge}
          labels={{
            color: t("color"),
            size: t("size"),
            strap: t("strap"),
            note: t("note"),
            submit: t("submit"),
          }}
        />
      </div>
    </main>
  );
}
