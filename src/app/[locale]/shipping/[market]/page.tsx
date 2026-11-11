import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { markets, type MarketId } from "@/lib/markets";
import { JsonLd } from "@/components/seo/JsonLd";
import { hreflangAlternates } from "@/lib/seo";
import { site, type Locale } from "@/lib/site";
import type { Metadata } from "next";

const ids = Object.keys(markets) as MarketId[];

export function generateStaticParams() {
  return ids.flatMap((market) => site.locales.map((locale) => ({ locale, market })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; market: string }>;
}): Promise<Metadata> {
  const { locale, market } = await params;
  const data = markets[market as MarketId];
  if (!data) return {};
  const loc = locale as Locale;
  return {
    title: `Shipping · ${data.name[loc]}`,
    description: data.transit[loc],
    keywords: data.keywords[loc],
    alternates: hreflangAlternates(`/shipping/${market}`),
  };
}

export default async function ShippingMarketPage({
  params,
}: {
  params: Promise<{ locale: string; market: string }>;
}) {
  const { locale, market } = await params;
  setRequestLocale(locale);
  const data = markets[market as MarketId];
  if (!data) notFound();
  const loc = locale as Locale;
  const t = await getTranslations("shipping");

  return (
    <main className="mx-auto max-w-3xl px-5 pt-28 pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: data.name[loc],
              acceptedAnswer: { "@type": "Answer", text: `${data.transit[loc]} ${data.dutyNote[loc]}` },
            },
          ],
        }}
      />
      <p className="text-[0.65rem] tracking-[0.3em] uppercase text-gold">{t("title")}</p>
      <h1 className="mt-3 font-display text-5xl">{data.name[loc]}</h1>
      <p className="mt-6 text-bone/70">{t("intro")}</p>
      <p className="mt-8 text-lg">{data.transit[loc]}</p>
      <p className="mt-4 text-bone/70">{data.dutyNote[loc]}</p>
      <p className="mt-8 text-xs tracking-widest uppercase text-gold">{data.currency}</p>
    </main>
  );
}
