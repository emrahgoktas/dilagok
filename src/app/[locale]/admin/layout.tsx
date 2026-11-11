import type { Metadata } from "next";
import type { ReactNode } from "react";
import { isAdmin } from "@/lib/admin-auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Atelier desk",
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const ok = await isAdmin();
  if (!ok) return <LoginForm />;
  return <AdminShell>{children}</AdminShell>;
}
