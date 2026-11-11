import { allArticles, allProducts } from "@/lib/catalog-store";
import { Link } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export default async function AdminHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const products = allProducts({ admin: true });
  const articles = allArticles({ admin: true });

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-5xl">Desk</h1>
        <p className="mt-3 max-w-xl text-bone/60">
          Add bags and journal notes with Google, Meta, Instagram, Pinterest, TikTok and GEO checks on
          the product screen.
        </p>
      </header>
      <dl className="grid gap-6 sm:grid-cols-2">
        <div className="border border-bone/10 p-6">
          <dt className="text-[0.62rem] tracking-[0.28em] uppercase text-gold">Products</dt>
          <dd className="mt-3 font-display text-5xl">{products.length}</dd>
          <Link href="/admin/products/new" className="mt-4 inline-block text-xs uppercase tracking-widest">
            New product
          </Link>
        </div>
        <div className="border border-bone/10 p-6">
          <dt className="text-[0.62rem] tracking-[0.28em] uppercase text-gold">Journal</dt>
          <dd className="mt-3 font-display text-5xl">{articles.length}</dd>
          <Link href="/admin/journal/new" className="mt-4 inline-block text-xs uppercase tracking-widest">
            New article
          </Link>
        </div>
      </dl>
    </div>
  );
}
