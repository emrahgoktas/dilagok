"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { cordPalette, type CordColor, type Product, type Size, type Strap } from "@/lib/products";
import { emptyLocale, emptyLocaleList } from "@/lib/empty-locale";
import { scoreProduct } from "@/lib/publish-criteria";
import { ScorePanel } from "./ScorePanel";
import { Field, inputClass } from "./fields";
import type { Locale } from "@/lib/site";

const locales: Locale[] = ["en", "ar", "fr", "de"];
const silhouettes: Product["silhouette"][] = ["tote", "crossbody", "clutch", "bucket", "shoulder"];
const sizes: Size[] = ["mini", "midi", "maxi"];
const straps: Strap[] = ["shoulder", "crossbody", "top-handle", "clutch"];
const colors = Object.keys(cordPalette) as CordColor[];

export function blankProduct(): Product {
  return {
    slug: "",
    sku: "DG-",
    name: emptyLocale(),
    silhouette: "tote",
    summary: emptyLocale(),
    description: emptyLocale(),
    priceEur: 420,
    colors: ["bone"],
    sizes: ["midi"],
    straps: ["shoulder"],
    dimensions: { w: 32, h: 28, d: 12 },
    leadWeeks: "2–4",
    seoKeywords: emptyLocaleList(),
    hero: false,
    published: true,
    availability: "PreOrder",
    material: "Cotton cord / macrame",
    googleCategory: "3032",
    geoAnswer: emptyLocale(),
    seoTitle: emptyLocale(),
    seoDescription: emptyLocale(),
    faq: [
      { q: emptyLocale(), a: emptyLocale() },
      { q: emptyLocale(), a: emptyLocale() },
    ],
    hashtags: ["#dilagok", "#macramebag", "#handmadebag"],
    alt: "",
  };
}

async function upload(file: File) {
  const body = new FormData();
  body.set("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  const data = (await res.json()) as { url?: string; error?: string };
  if (!res.ok || !data.url) throw new Error(data.error ?? "Upload failed");
  return data.url;
}

function readSize(file: File) {
  return new Promise<{ w: number; h: number }>((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = URL.createObjectURL(file);
  });
}

export function ProductForm({ initial }: { initial?: Product }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product>(initial ?? blankProduct());
  const [loc, setLoc] = useState<Locale>("en");
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [status, setStatus] = useState("");
  const editing = Boolean(initial);

  const patch = (partial: Partial<Product>) => setProduct((p) => ({ ...p, ...partial }));

  const checks = useMemo(
    () =>
      scoreProduct({
        slug: product.slug,
        sku: product.sku,
        nameEn: product.name.en,
        summaryEn: product.summary.en,
        descriptionEn: product.description.en,
        geoAnswerEn: product.geoAnswer?.en ?? "",
        seoTitleEn: product.seoTitle?.en ?? "",
        seoDescriptionEn: product.seoDescription?.en ?? "",
        alt: product.alt ?? "",
        priceEur: product.priceEur,
        image: product.image,
        imageWidth: dims.w,
        imageHeight: dims.h,
        gtin: product.gtin,
        hashtags: product.hashtags ?? [],
        igCaption: product.igCaption ?? "",
        pinTitle: product.pinTitle ?? "",
        pinDescription: product.pinDescription ?? "",
        tiktokCaption: product.tiktokCaption ?? "",
        faqCount: (product.faq ?? []).filter((f) => f.q.en && f.a.en).length,
        translated: {
          ar: Boolean(product.name.ar),
          fr: Boolean(product.name.fr),
          de: Boolean(product.name.de),
        },
      }),
    [product, dims],
  );

  return (
    <form
      className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("Saving…");
        const res = await fetch(
          editing ? `/api/admin/products/${product.slug}` : "/api/admin/products",
          {
            method: editing ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
          },
        );
        const data = await res.json();
        if (!res.ok) {
          setStatus(data.error ?? "Save failed");
          return;
        }
        setStatus("Saved to data/catalog.json");
        router.replace("/admin/products");
        router.refresh();
      }}
    >
      <div className="space-y-10">
        <header>
          <p className="text-[0.62rem] tracking-[0.3em] uppercase text-gold">Product</p>
          <h1 className="mt-2 font-display text-4xl">{editing ? product.name.en || product.slug : "New bag"}</h1>
          <p className="mt-3 max-w-xl text-sm text-bone/55">
            Fields follow Google Merchant, Meta catalog, Instagram, Pinterest, TikTok, Threads and GEO (AI
            search) limits. Score updates as you type.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <Field label="Slug" hint="URL: /product/slug">
            <input
              className={inputClass}
              required
              value={product.slug}
              disabled={editing}
              onChange={(e) => patch({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
            />
          </Field>
          <Field label="SKU">
            <input className={inputClass} required value={product.sku} onChange={(e) => patch({ sku: e.target.value })} />
          </Field>
          <Field label="GTIN / barcode" hint="Optional for handmade">
            <input className={inputClass} value={product.gtin ?? ""} onChange={(e) => patch({ gtin: e.target.value })} />
          </Field>
          <Field label="Price EUR">
            <input
              className={inputClass}
              type="number"
              min={1}
              value={product.priceEur}
              onChange={(e) => patch({ priceEur: Number(e.target.value) })}
            />
          </Field>
          <Field label="Silhouette">
            <select
              className={inputClass}
              value={product.silhouette}
              onChange={(e) => patch({ silhouette: e.target.value as Product["silhouette"] })}
            >
              {silhouettes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Availability">
            <select
              className={inputClass}
              value={product.availability ?? "PreOrder"}
              onChange={(e) => patch({ availability: e.target.value as Product["availability"] })}
            >
              <option value="PreOrder">Pre-order (made to order)</option>
              <option value="InStock">In stock</option>
              <option value="OutOfStock">Out of stock</option>
            </select>
          </Field>
          <Field label="Lead weeks">
            <input className={inputClass} value={product.leadWeeks} onChange={(e) => patch({ leadWeeks: e.target.value })} />
          </Field>
          <Field label="Material">
            <input
              className={inputClass}
              value={product.material ?? ""}
              onChange={(e) => patch({ material: e.target.value })}
            />
          </Field>
          <Field label="Google category ID" hint="3032 handbags">
            <input
              className={inputClass}
              value={product.googleCategory ?? ""}
              onChange={(e) => patch({ googleCategory: e.target.value })}
            />
          </Field>
          <Field label="Weight grams">
            <input
              className={inputClass}
              type="number"
              value={product.weightGrams ?? 0}
              onChange={(e) => patch({ weightGrams: Number(e.target.value) })}
            />
          </Field>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {(["w", "h", "d"] as const).map((k) => (
            <Field key={k} label={`Dimension ${k} (cm)`}>
              <input
                className={inputClass}
                type="number"
                value={product.dimensions[k]}
                onChange={(e) =>
                  patch({ dimensions: { ...product.dimensions, [k]: Number(e.target.value) } })
                }
              />
            </Field>
          ))}
        </section>

        <fieldset>
          <legend className="text-[0.62rem] tracking-[0.22em] uppercase text-bone/55">Colours</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {colors.map((c) => (
              <label key={c} className="text-sm">
                <input
                  type="checkbox"
                  className="me-2"
                  checked={product.colors.includes(c)}
                  onChange={() =>
                    patch({
                      colors: product.colors.includes(c)
                        ? product.colors.filter((x) => x !== c)
                        : [...product.colors, c],
                    })
                  }
                />
                {c}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="grid gap-6 md:grid-cols-2">
          <div>
            <legend className="text-[0.62rem] tracking-[0.22em] uppercase text-bone/55">Sizes</legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {sizes.map((s) => (
                <label key={s} className="text-sm">
                  <input
                    type="checkbox"
                    className="me-2"
                    checked={product.sizes.includes(s)}
                    onChange={() =>
                      patch({
                        sizes: product.sizes.includes(s)
                          ? product.sizes.filter((x) => x !== s)
                          : [...product.sizes, s],
                      })
                    }
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div>
            <legend className="text-[0.62rem] tracking-[0.22em] uppercase text-bone/55">Straps</legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {straps.map((s) => (
                <label key={s} className="text-sm">
                  <input
                    type="checkbox"
                    className="me-2"
                    checked={product.straps.includes(s)}
                    onChange={() =>
                      patch({
                        straps: product.straps.includes(s)
                          ? product.straps.filter((x) => x !== s)
                          : [...product.straps, s],
                      })
                    }
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        <Field label="Main still" hint="Min 800px. 4:5 for IG, 2:3 for Pinterest, 9:16 for TikTok.">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const size = await readSize(file);
              setDims(size);
              const url = await upload(file);
              patch({ image: url });
            }}
          />
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image} alt="" className="mt-3 h-40 w-auto object-cover" />
          ) : null}
        </Field>
        <Field label="Alt text">
          <input className={inputClass} value={product.alt ?? ""} onChange={(e) => patch({ alt: e.target.value })} />
        </Field>

        <div className="flex gap-2">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLoc(l)}
              className={`px-3 py-1 text-[0.62rem] uppercase tracking-widest ${loc === l ? "bg-bone text-ink" : "border border-bone/20"}`}
            >
              {l}
            </button>
          ))}
        </div>

        <Field label={`Name (${loc})`}>
          <input
            className={inputClass}
            required={loc === "en"}
            value={product.name[loc]}
            onChange={(e) => patch({ name: { ...product.name, [loc]: e.target.value } })}
          />
        </Field>
        <Field label={`Summary (${loc})`} hint="SEO + Pinterest + IG first line">
          <textarea
            className={`${inputClass} h-24`}
            value={product.summary[loc]}
            onChange={(e) => patch({ summary: { ...product.summary, [loc]: e.target.value } })}
          />
        </Field>
        <Field label={`Description (${loc})`}>
          <textarea
            className={`${inputClass} h-36`}
            value={product.description[loc]}
            onChange={(e) => patch({ description: { ...product.description, [loc]: e.target.value } })}
          />
        </Field>
        <Field
          label={`GEO answer (${loc})`}
          hint="40–90 words. What it is, who makes it, where, how long. For ChatGPT / Perplexity / Google AI."
        >
          <textarea
            className={`${inputClass} h-28`}
            value={product.geoAnswer?.[loc] ?? ""}
            onChange={(e) =>
              patch({ geoAnswer: { ...(product.geoAnswer ?? emptyLocale()), [loc]: e.target.value } })
            }
          />
        </Field>
        <Field label={`SEO title (${loc})`} hint="45–60 characters">
          <input
            className={inputClass}
            value={product.seoTitle?.[loc] ?? ""}
            onChange={(e) =>
              patch({ seoTitle: { ...(product.seoTitle ?? emptyLocale()), [loc]: e.target.value } })
            }
          />
        </Field>
        <Field label={`SEO description (${loc})`} hint="140–160 characters">
          <textarea
            className={`${inputClass} h-20`}
            value={product.seoDescription?.[loc] ?? ""}
            onChange={(e) =>
              patch({
                seoDescription: { ...(product.seoDescription ?? emptyLocale()), [loc]: e.target.value },
              })
            }
          />
        </Field>
        <Field label={`Keywords (${loc})`} hint="Comma separated, 3–8">
          <input
            className={inputClass}
            value={(product.seoKeywords[loc] ?? []).join(", ")}
            onChange={(e) =>
              patch({
                seoKeywords: {
                  ...product.seoKeywords,
                  [loc]: e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                },
              })
            }
          />
        </Field>

        <div className="space-y-4">
          <p className="text-[0.62rem] tracking-[0.22em] uppercase text-bone/55">FAQ for GEO / schema</p>
          {(product.faq ?? []).map((item, i) => (
            <div key={i} className="grid gap-3 md:grid-cols-2">
              <input
                className={inputClass}
                placeholder={`Question ${i + 1} (${loc})`}
                value={item.q[loc]}
                onChange={(e) => {
                  const faq = [...(product.faq ?? [])];
                  faq[i] = { ...item, q: { ...item.q, [loc]: e.target.value } };
                  patch({ faq });
                }}
              />
              <input
                className={inputClass}
                placeholder="Answer"
                value={item.a[loc]}
                onChange={(e) => {
                  const faq = [...(product.faq ?? [])];
                  faq[i] = { ...item, a: { ...item.a, [loc]: e.target.value } };
                  patch({ faq });
                }}
              />
            </div>
          ))}
        </div>

        <section className="space-y-4 border-t border-bone/10 pt-8">
          <h2 className="font-display text-2xl">Channel copy</h2>
          <Field label="Instagram caption" hint="2,200 max. Hook in the first 125 characters.">
            <textarea
              className={`${inputClass} h-28`}
              value={product.igCaption ?? ""}
              onChange={(e) => patch({ igCaption: e.target.value })}
            />
          </Field>
          <Field label="Hashtags" hint="3–8, comma separated">
            <input
              className={inputClass}
              value={(product.hashtags ?? []).join(", ")}
              onChange={(e) =>
                patch({
                  hashtags: e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                })
              }
            />
          </Field>
          <Field label="Pinterest title" hint="≤ 100">
            <input
              className={inputClass}
              value={product.pinTitle ?? ""}
              onChange={(e) => patch({ pinTitle: e.target.value })}
            />
          </Field>
          <Field label="Pinterest description" hint="≤ 500">
            <textarea
              className={`${inputClass} h-24`}
              value={product.pinDescription ?? ""}
              onChange={(e) => patch({ pinDescription: e.target.value })}
            />
          </Field>
          <Field label="TikTok / Reels hook">
            <textarea
              className={`${inputClass} h-20`}
              value={product.tiktokCaption ?? ""}
              onChange={(e) => patch({ tiktokCaption: e.target.value })}
            />
          </Field>
        </section>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={product.published !== false}
            onChange={(e) => patch({ published: e.target.checked })}
          />
          Published on the site
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={product.hero}
            onChange={(e) => patch({ hero: e.target.checked })}
          />
          Use as homepage hero product
        </label>

        <div className="flex items-center gap-4">
          <button className="bg-bone px-8 py-3 text-[0.7rem] tracking-[0.25em] uppercase text-ink">
            Save product
          </button>
          <p className="text-xs text-bone/45">{status}</p>
        </div>
      </div>
      <ScorePanel checks={checks} />
    </form>
  );
}
