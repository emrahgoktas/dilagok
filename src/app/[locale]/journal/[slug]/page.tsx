import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { allArticles, getArticle } from "@/lib/catalog-store";
import { site, type Locale } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { hreflangAlternates } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamicParams = true;

export function generateStaticParams() {
  return allArticles().flatMap((a) =>
    site.locales.map((locale) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const loc = locale as Locale;
  return {
    title: article.seoTitle?.[loc] || article.title[loc],
    description: article.seoDescription?.[loc] || article.excerpt[loc],
    alternates: hreflangAlternates(`/journal/${slug}`),
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getArticle(slug);
  if (!article) notFound();
  const loc = locale as Locale;

  return (
    <article className="mx-auto max-w-2xl px-5 pt-28 pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title[loc],
          author: { "@type": "Person", name: site.founder },
          publisher: { "@type": "Organization", name: site.name },
        }}
      />
      <p className="text-[0.65rem] tracking-[0.3em] uppercase text-gold">{site.founder}</p>
      <h1 className="mt-4 font-display text-5xl">{article.title[loc]}</h1>
      <p className="mt-10 text-lg leading-relaxed text-bone/80">{article.body[loc]}</p>
    </article>
  );
}
