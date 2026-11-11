import { allProducts } from "@/lib/catalog-store";
import { Link } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export default async function AdminProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const products = allProducts({ admin: true });

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <h1 className="font-display text-4xl">Products</h1>
        <Link href="/admin/products/new" className="text-[0.65rem] tracking-[0.25em] uppercase text-gold">
          New
        </Link>
      </div>
      <ul className="mt-10 divide-y divide-bone/10">
        {products.map((p) => (
          <li key={p.slug} className="flex items-center justify-between py-4">
            <div>
              <p className="font-display text-2xl">{p.name.en}</p>
              <p className="text-xs uppercase tracking-widest text-bone/40">
                {p.sku} · {p.silhouette} · {p.published === false ? "draft" : "live"}
              </p>
            </div>
            <Link href={`/admin/products/${p.slug}`} className="text-xs uppercase tracking-widest">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
