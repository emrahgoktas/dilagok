import { getTranslations, setRequestLocale } from "next-intl/server";
import { site, type Locale } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { hreflangAlternates } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "atelier" });
  return { title: t("title"), description: t("body"), alternates: hreflangAlternates("/atelier") };
}

export default async function AtelierPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("atelier");
  const loc = locale as Locale;

  return (
    <main className="mx-auto max-w-3xl px-5 pt-28 pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: site.founder,
          jobTitle: "Atelier founder",
          worksFor: { "@type": "Organization", name: site.name },
          nationality: "TR",
        }}
      />
      <h1 className="font-display text-5xl">{t("title")}</h1>
      <p className="mt-8 text-lg leading-relaxed text-bone/80">{t("body")}</p>
      <h2 className="mt-16 text-[0.65rem] tracking-[0.3em] uppercase text-gold">
        {t("factsTitle")}
      </h2>
      <dl className="mt-6 divide-y divide-bone/10">
        {[
          [t("founder"), site.founder],
          [t("origin"), loc === "ar" ? "تركيا" : site.origin],
          [t("craft"), t("craftValue")],
          [t("lead"), t("leadValue")],
          [t("markets"), t("marketsValue")],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-8 py-4 text-sm">
            <dt className="text-bone/50">{k}</dt>
            <dd className="max-w-sm text-end">{v}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
