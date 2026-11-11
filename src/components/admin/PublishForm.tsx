"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const platforms = [
  "instagram",
  "pinterest",
  "facebook",
  "tiktok",
  "telegram",
  "threads",
];

export function PublishForm({ slugs }: { slugs: string[] }) {
  const t = useTranslations("admin");
  const [secret, setSecret] = useState("");
  const [slug, setSlug] = useState(slugs[0]);
  const [caption, setCaption] = useState("");
  const [selected, setSelected] = useState<string[]>(platforms);
  const [out, setOut] = useState("");

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch("/api/publish", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-secret": secret,
          },
          body: JSON.stringify({ slug, caption, platforms: selected }),
        });
        setOut(JSON.stringify(await res.json(), null, 2));
      }}
    >
      <h1 className="font-display text-4xl">{t("title")}</h1>
      <input
        className="w-full border border-bone/20 bg-transparent px-3 py-2"
        placeholder="admin secret"
        type="password"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
      <select
        className="w-full border border-bone/20 bg-transparent px-3 py-2"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      >
        {slugs.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <textarea
        className="h-32 w-full border border-bone/20 bg-transparent px-3 py-2"
        placeholder={t("caption")}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <fieldset>
        <legend className="text-xs tracking-widest uppercase text-gold">
          {t("platforms")}
        </legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {platforms.map((p) => (
            <label key={p} className="text-sm">
              <input
                type="checkbox"
                className="me-2"
                checked={selected.includes(p)}
                onChange={() =>
                  setSelected((cur) =>
                    cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p],
                  )
                }
              />
              {p}
            </label>
          ))}
        </div>
      </fieldset>
      <button className="bg-bone px-6 py-3 text-[0.7rem] tracking-[0.25em] uppercase text-ink">
        {t("send")}
      </button>
      <p className="text-xs text-bone/40">{t("needKey")}</p>
      {out ? (
        <pre className="overflow-auto text-xs text-bone/60">{out}</pre>
      ) : null}
    </form>
  );
}
