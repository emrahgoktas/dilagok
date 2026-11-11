"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/routing";

export function HideOnAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return children;
}
