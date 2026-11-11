import { notFound } from "next/navigation";
import { getProduct } from "@/lib/catalog-store";
import { ProductForm } from "@/components/admin/ProductForm";
import { setRequestLocale } from "next-intl/server";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProduct(slug, { admin: true });
  if (!product) notFound();
  return <ProductForm initial={product} />;
}
