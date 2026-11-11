"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import type { CordColor, Product, Size, Strap } from "@/lib/products";
import { BagPortrait } from "./BagPortrait";

export function CustomForm({
  product,
  colors,
  sizes,
  straps,
  surcharge,
  labels,
}: {
  product: Product;
  colors: { id: CordColor; hex: string; label: string }[];
  sizes: Size[];
  straps: Strap[];
  surcharge: number;
  labels: { color: string; size: string; strap: string; note: string; submit: string };
}) {
  const slug = product.slug;
  const [color, setColor] = useState<CordColor>(colors[0].id);
  const [size, setSize] = useState(sizes[0]);
  const [strap, setStrap] = useState(straps[0]);
  const [note, setNote] = useState("");
  const router = useRouter();

  return (
    <form
      className="mt-8 space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        const q = new URLSearchParams({
          slug,
          color,
          size,
          strap,
          note,
          custom: "1",
        });
        router.push(`/checkout?${q.toString()}`);
      }}
    >
      <div className="md:hidden">
        <BagPortrait product={product} color={color} className="aspect-[4/5]" />
      </div>
      <fieldset>
        <legend className="text-[0.65rem] tracking-[0.25em] uppercase text-gold">
          {labels.color}
        </legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {colors.map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() => setColor(c.id)}
              className={`h-8 w-8 rounded-full border ${color === c.id ? "border-gold scale-110" : "border-bone/30"}`}
              style={{ background: c.hex }}
              aria-label={c.label}
            />
          ))}
        </div>
      </fieldset>
      <label className="block text-sm">
        {labels.size}
        <select
          className="mt-2 w-full bg-transparent border border-bone/20 px-3 py-2"
          value={size}
          onChange={(e) => setSize(e.target.value as Size)}
        >
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        {labels.strap}
        <select
          className="mt-2 w-full bg-transparent border border-bone/20 px-3 py-2"
          value={strap}
          onChange={(e) => setStrap(e.target.value as Strap)}
        >
          {straps.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        {labels.note}
        <input
          className="mt-2 w-full bg-transparent border border-bone/20 px-3 py-2"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </label>
      <p className="text-xs text-bone/50">+€{surcharge} commission</p>
      <button className="bg-bone px-6 py-3 text-[0.7rem] tracking-[0.25em] uppercase text-ink">
        {labels.submit}
      </button>
    </form>
  );
}
