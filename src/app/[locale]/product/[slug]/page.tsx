import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cordPalette } from "@/lib/products";
import { allProducts, getProduct } from "@/lib/catalog-store";
import { ProductMedia } from "@/components/product/ProductMedia";
import { ShareBar } from "@/components/product/ShareBar";
import { Link } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatMoney } from "@/lib/markets";
import { hreflangAlternates, localeUrl } from "@/lib/seo";
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
    title: product.seoTitle?.[loc] || `${product.name[loc]} — handmade macrame bag`,
    description: product.seoDescription?.[loc] || product.summary[loc],
    keywords: product.seoKeywords[loc],
    alternates: hreflangAlternates(`/product/${slug}`),
    openGraph: {
      title: product.name[loc],
      description: product.summary[loc],
      type: "website",
      images: product.image ? [{ url: product.image }] : undefined,
    },
    other: {
      "og:type": "product",
      "product:price:amount": String(product.priceEur),
      "product:price:currency": "EUR",
      "pin:description": product.summary[loc],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProduct(slug);
  if (!product) notFound();
  const loc = locale as Locale;
  const t = await getTranslations("product");

  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-5 pt-28 pb-24 md:grid-cols-2">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name[loc],
          sku: product.sku,
          brand: { "@type": "Brand", name: "DILAGOK" },
          description: product.geoAnswer?.[loc] || product.description[loc],
          material: product.material ?? "Cotton cord / macrame",
          countryOfOrigin: "TR",
          image: product.image,
          offers: {
            "@type": "Offer",
            price: product.priceEur,
            priceCurrency: "EUR",
            availability: "https://schema.org/PreOrder",
            url: localeUrl(loc, `/product/${slug}`),
            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingDestination: [
                { "@type": "DefinedRegion", addressCountry: "AE" },
                { "@type": "DefinedRegion", addressCountry: "FR" },
                { "@type": "DefinedRegion", addressCountry: "DE" },
                { "@type": "DefinedRegion", addressCountry: "GB" },
              ],
            },
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              applicableCountry: "DE",
              returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 14,
            },
          },
        }}
      />
      {product.faq?.some((f) => f.q[loc] && f.a[loc]) ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: product.faq
              .filter((f) => f.q[loc] && f.a[loc])
              .map((f) => ({
                "@type": "Question",
                name: f.q[loc],
                acceptedAnswer: { "@type": "Answer", text: f.a[loc] },
              })),
          }}
        />
      ) : null}
      <ProductMedia product={product} priority className="aspect-[4/5]" />
      <div>
        <p className="text-[0.65rem] tracking-[0.3em] uppercase text-gold">{product.sku}</p>
        <h1 className="mt-3 font-display text-5xl">{product.name[loc]}</h1>
        <p className="mt-4 text-2xl">{formatMoney(product.priceEur, "EUR")}</p>
        <p className="mt-6 max-w-md text-bone/75">{product.description[loc]}</p>
        <dl className="mt-8 space-y-2 text-sm text-bone/70">
          <div className="flex justify-between gap-6 border-b border-bone/10 py-2">
            <dt>{t("lead")}</dt>
            <dd>{product.leadWeeks} w</dd>
          </div>
          <div className="flex justify-between gap-6 border-b border-bone/10 py-2">
            <dt>{t("dimensions")}</dt>
            <dd>
              {product.dimensions.w} × {product.dimensions.h} × {product.dimensions.d} cm
            </dd>
          </div>
          <div className="flex justify-between gap-6 border-b border-bone/10 py-2">
            <dt>{t("cord")}</dt>
            <dd className="flex gap-2">
              {product.colors.map((c) => (
                <span
                  key={c}
                  title={cordPalette[c].label[loc]}
                  className="inline-block h-4 w-4 rounded-full border border-bone/30"
                  style={{ background: cordPalette[c].hex }}
                />
              ))}
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-sm text-bone/60">{t("care")}</p>
        <p className="mt-2 text-sm text-bone/60">{t("ships")}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={`/checkout?slug=${product.slug}`}
            className="bg-bone px-6 py-3 text-[0.7rem] tracking-[0.25em] uppercase text-ink"
          >
            {t("buy")}
          </Link>
          <Link
            href={`/custom/${product.slug}`}
            className="border border-bone/40 px-6 py-3 text-[0.7rem] tracking-[0.25em] uppercase"
          >
            {t("customize")}
          </Link>
        </div>
        <div className="mt-8">
          <ShareBar path={`/product/${product.slug}`} title={product.name[loc]} />
        </div>
      </div>
    </main>
  );
}
