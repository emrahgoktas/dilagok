import { setRequestLocale } from "next-intl/server";
import { PublishForm } from "@/components/admin/PublishForm";
import { products } from "@/lib/products";

export default async function AdminPublishPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="mx-auto max-w-lg px-5 pt-28 pb-24">
      <PublishForm slugs={products.map((p) => p.slug)} />
    </main>
  );
}
