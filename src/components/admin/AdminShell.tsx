"use client";

import type { ReactNode } from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";

const links = [
  { href: "/admin" as const, label: "Overview" },
  { href: "/admin/products" as const, label: "Products" },
  { href: "/admin/products/new" as const, label: "New product" },
  { href: "/admin/journal" as const, label: "Journal" },
  { href: "/admin/journal/new" as const, label: "New article" },
  { href: "/admin/publish" as const, label: "Social publish" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-ink text-bone">
      <div className="border-b border-bone/10 px-5 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="text-[0.65rem] tracking-[0.32em] uppercase text-gold">Atelier desk</p>
          <nav className="flex flex-wrap gap-4 text-[0.62rem] tracking-[0.2em] uppercase">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={pathname === l.href || (l.href !== "/admin" && pathname.startsWith(l.href) && l.href !== "/admin/products/new" && !(l.href === "/admin/products" && pathname.includes("/new"))) ? "text-gold" : "text-bone/60 hover:text-bone"}
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              className="text-bone/40 hover:text-bone"
              onClick={async () => {
                await fetch("/api/admin/session", { method: "DELETE" });
                router.replace("/admin");
                router.refresh();
              }}
            >
              Sign out
            </button>
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 py-10">{children}</div>
    </div>
  );
}
