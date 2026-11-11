"use client";

import { useLocale, useTranslations } from "next-intl";
import { site } from "@/lib/site";

export function ShareBar({ path, title }: { path: string; title: string }) {
  const t = useTranslations("product");
  const locale = useLocale();
  const url = `${site.url}/${locale}${path}`;
  const pin = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`;
  const wa = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;

  return (
    <div className="flex gap-6 text-[0.65rem] tracking-[0.22em] uppercase text-gold">
      <a href={pin} target="_blank" rel="noreferrer">
        {t("pin")}
      </a>
      <a href={wa} target="_blank" rel="noreferrer">
        {t("whatsapp")}
      </a>
    </div>
  );
}
