"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { markets, type MarketId } from "@/lib/markets";
import { customSurcharge, getProduct, type CordColor, type Size, type Strap } from "@/lib/products";
import { ProductMedia } from "@/components/product/ProductMedia";
import type { Locale } from "@/lib/site";

export function CheckoutClient({
  locale,
  slug,
  custom,
  color,
  size,
  strap,
  note,
}: {
  locale: Locale;
  slug: string;
  custom: boolean;
  color?: CordColor;
  size?: Size;
  strap?: Strap;
  note?: string;
}) {
  const product = getProduct(slug);
  const t = useTranslations("checkout");
  const [market, setMarket] = useState<MarketId>("uae");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  if (!product) return null;
  const total = product.priceEur + (custom ? customSurcharge : 0);

  return (
    <main className="mx-auto grid max-w-4xl gap-10 px-5 pt-28 pb-24 md:grid-cols-2">
      <ProductMedia product={product} color={color} className="aspect-[4/5]" />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setPending(true);
          setError("");
          const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              slug,
              custom,
              color,
              size,
              strap,
              note,
              market,
              locale,
            }),
          });
          const data = (await res.json()) as { url?: string; error?: string };
          if (data.url) {
            window.location.href = data.url;
            return;
          }
          setError(data.error ?? t("unavailable"));
          setPending(false);
        }}
      >
        <h1 className="font-display text-4xl">{t("title")}</h1>
        <p className="mt-2 font-display text-2xl">{product.name[locale]}</p>
        <p className="mt-2 text-gold">€{total}</p>
        <label className="mt-8 block text-sm">
          {t("country")}
          <select
            className="mt-2 w-full border border-bone/20 bg-transparent px-3 py-2"
            value={market}
            onChange={(e) => setMarket(e.target.value as MarketId)}
          >
            {(Object.keys(markets) as MarketId[]).map((id) => (
              <option key={id} value={id}>
                {markets[id].name[locale]}
              </option>
            ))}
          </select>
        </label>
        {error ? <p className="mt-4 text-sm text-gold">{error}</p> : null}
        <button
          disabled={pending}
          className="mt-8 bg-bone px-6 py-3 text-[0.7rem] tracking-[0.25em] uppercase text-ink disabled:opacity-50"
        >
          Stripe
        </button>
        <p className="mt-4 text-xs text-bone/40">
          Physical goods: Stripe. Paddle is not used.
        </p>
      </form>
    </main>
  );
}
