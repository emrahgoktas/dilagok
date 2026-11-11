import { setRequestLocale } from "next-intl/server";
import { products } from "@/lib/products";
import { ProductMedia } from "@/components/product/ProductMedia";
import { Link } from "@/i18n/routing";
import { hreflangAlternates } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lookbook",
  alternates: hreflangAlternates("/lookbook"),
};

export default async function LookbookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="columns-1 gap-4 px-4 pt-28 pb-24 sm:columns-2 md:columns-3">
      {products.map((p, i) => (
        <Link
          key={p.slug}
          href={`/product/${p.slug}`}
          className="mb-4 block break-inside-avoid"
          style={{ marginTop: i % 2 ? 24 : 0 }}
        >
          <ProductMedia
            product={p}
            className={i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/5]"}
          />
        </Link>
      ))}
    </main>
  );
}
