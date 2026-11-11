"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import type { Article } from "@/lib/journal";
import { emptyLocale } from "@/lib/empty-locale";
import { Field, inputClass } from "./fields";
import type { Locale } from "@/lib/site";

const locales: Locale[] = ["en", "ar", "fr", "de"];

export function blankArticle(): Article {
  return {
    slug: "",
    title: emptyLocale(),
    excerpt: emptyLocale(),
    body: emptyLocale(),
    geoAnswer: emptyLocale(),
    seoTitle: emptyLocale(),
    seoDescription: emptyLocale(),
    tags: [],
    date: new Date().toISOString().slice(0, 10),
    published: true,
    alt: "",
  };
}

export function JournalForm({ initial }: { initial?: Article }) {
  const router = useRouter();
  const [article, setArticle] = useState<Article>(initial ?? blankArticle());
  const [loc, setLoc] = useState<Locale>("en");
  const [status, setStatus] = useState("");
  const editing = Boolean(initial);
  const patch = (partial: Partial<Article>) => setArticle((a) => ({ ...a, ...partial }));
  const excerptLen = article.excerpt.en.length;
  const geoWords = article.geoAnswer?.en.trim().split(/\s+/).filter(Boolean).length ?? 0;

  return (
    <form
      className="max-w-3xl space-y-8"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("Saving…");
        const res = await fetch(
          editing ? `/api/admin/journal/${article.slug}` : "/api/admin/journal",
          {
            method: editing ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(article),
          },
        );
        const data = await res.json();
        if (!res.ok) {
          setStatus(data.error ?? "Save failed");
          return;
        }
        setStatus("Saved");
        router.replace("/admin/journal");
        router.refresh();
      }}
    >
      <header>
        <p className="text-[0.62rem] tracking-[0.3em] uppercase text-gold">Journal</p>
        <h1 className="mt-2 font-display text-4xl">{editing ? article.title.en : "New article"}</h1>
        <p className="mt-3 text-sm text-bone/55">
          Excerpt is the meta description. GEO answer is the 40–90 word block models should quote.
        </p>
      </header>

      <Field label="Slug">
        <input
          className={inputClass}
          required
          disabled={editing}
          value={article.slug}
          onChange={(e) => patch({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
        />
      </Field>
      <Field label="Date">
        <input
          className={inputClass}
          type="date"
          value={article.date ?? ""}
          onChange={(e) => patch({ date: e.target.value })}
        />
      </Field>
      <Field label="Cover">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const body = new FormData();
            body.set("file", file);
            const res = await fetch("/api/admin/upload", { method: "POST", body });
            const data = (await res.json()) as { url?: string };
            if (data.url) patch({ cover: data.url });
          }}
        />
      </Field>
      <Field label="Cover alt">
        <input className={inputClass} value={article.alt ?? ""} onChange={(e) => patch({ alt: e.target.value })} />
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

      <Field label={`Title (${loc})`}>
        <input
          className={inputClass}
          required={loc === "en"}
          value={article.title[loc]}
          onChange={(e) => patch({ title: { ...article.title, [loc]: e.target.value } })}
        />
      </Field>
      <Field label={`Excerpt (${loc})`} hint={`${excerptLen} chars — aim 140–160 in English`}>
        <textarea
          className={`${inputClass} h-24`}
          value={article.excerpt[loc]}
          onChange={(e) => patch({ excerpt: { ...article.excerpt, [loc]: e.target.value } })}
        />
      </Field>
      <Field label={`Body (${loc})`}>
        <textarea
          className={`${inputClass} h-48`}
          value={article.body[loc]}
          onChange={(e) => patch({ body: { ...article.body, [loc]: e.target.value } })}
        />
      </Field>
      <Field label={`GEO answer (${loc})`} hint={`${geoWords} words — 40–90`}>
        <textarea
          className={`${inputClass} h-28`}
          value={article.geoAnswer?.[loc] ?? ""}
          onChange={(e) =>
            patch({ geoAnswer: { ...(article.geoAnswer ?? emptyLocale()), [loc]: e.target.value } })
          }
        />
      </Field>
      <Field label={`SEO title (${loc})`}>
        <input
          className={inputClass}
          value={article.seoTitle?.[loc] ?? ""}
          onChange={(e) =>
            patch({ seoTitle: { ...(article.seoTitle ?? emptyLocale()), [loc]: e.target.value } })
          }
        />
      </Field>
      <Field label="Tags" hint="Comma separated topical entities">
        <input
          className={inputClass}
          value={(article.tags ?? []).join(", ")}
          onChange={(e) => patch({ tags: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })}
        />
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={article.published !== false}
          onChange={(e) => patch({ published: e.target.checked })}
        />
        Published
      </label>
      <div className="flex items-center gap-4">
        <button className="bg-bone px-8 py-3 text-[0.7rem] tracking-[0.25em] uppercase text-ink">
          Save article
        </button>
        <p className="text-xs text-bone/45">{status}</p>
      </div>
    </form>
  );
}
