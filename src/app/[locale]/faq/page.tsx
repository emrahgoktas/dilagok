import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { hreflangAlternates } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return { title: t("title"), alternates: hreflangAlternates("/faq") };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <main className="mx-auto max-w-2xl px-5 pt-28 pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <h1 className="font-display text-5xl">{t("title")}</h1>
      <dl className="mt-12 space-y-10">
        {items.map((item) => (
          <div key={item.q}>
            <dt className="font-display text-2xl">{item.q}</dt>
            <dd className="mt-3 text-bone/70">{item.a}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
