import { JournalForm } from "@/components/admin/JournalForm";
import { setRequestLocale } from "next-intl/server";

export default async function NewArticlePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <JournalForm />;
}
