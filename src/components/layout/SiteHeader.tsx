"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { LogoMark, Wordmark } from "@/components/brand/LogoMark";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const links = [
  { href: "/collection" as const, key: "collection" },
  { href: "/atelier" as const, key: "atelier" },
  { href: "/lookbook" as const, key: "lookbook" },
  { href: "/shipping/uae" as const, key: "shipping" },
  { href: "/journal" as const, key: "journal" },
];

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between px-5 py-5 text-bone">
        <Link href="/" className="flex items-center gap-3 text-bone">
          <LogoMark className="h-9 w-7 transition-transform duration-700 hover:scale-[1.03]" />
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-6 text-[0.65rem] tracking-[0.22em] uppercase md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                pathname.startsWith(l.href) ? "opacity-100" : "opacity-70 hover:opacity-100"
              }
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
        <div className="flex gap-2 text-[0.6rem] tracking-[0.2em] uppercase opacity-80">
          {routing.locales.map((l) => (
            <Link
              key={l}
              href={pathname || "/"}
              locale={l}
              className={l === locale ? "text-gold" : "hover:text-gold"}
            >
              {l}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
