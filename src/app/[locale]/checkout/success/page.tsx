import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checkout");
  return (
    <main className="mx-auto max-w-lg px-5 pt-36 pb-24 text-center">
      <h1 className="font-display text-4xl">{t("success")}</h1>
      <Link href="/collection" className="mt-10 inline-block text-gold">
        ←
      </Link>
    </main>
  );
}
