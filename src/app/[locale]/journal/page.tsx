import { setRequestLocale } from "next-intl/server";
import { allArticles } from "@/lib/catalog-store";
import { Link } from "@/i18n/routing";
import { hreflangAlternates } from "@/lib/seo";
import type { Locale } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  alternates: hreflangAlternates("/journal"),
};

export default async function JournalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const journal = allArticles();

  return (
    <main className="mx-auto max-w-3xl px-5 pt-28 pb-24">
      <h1 className="font-display text-5xl">Journal</h1>
      <ul className="mt-12 space-y-12">
        {journal.map((a) => (
          <li key={a.slug}>
            <Link href={`/journal/${a.slug}`} className="block">
              <h2 className="font-display text-3xl">{a.title[loc]}</h2>
              <p className="mt-3 text-bone/70">{a.excerpt[loc]}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
