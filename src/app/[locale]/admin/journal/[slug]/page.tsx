import { notFound } from "next/navigation";
import { getArticle } from "@/lib/catalog-store";
import { JournalForm } from "@/components/admin/JournalForm";
import { setRequestLocale } from "next-intl/server";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getArticle(slug, { admin: true });
  if (!article) notFound();
  return <JournalForm initial={article} />;
}
