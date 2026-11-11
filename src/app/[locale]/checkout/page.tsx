import { setRequestLocale } from "next-intl/server";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";
import type { Locale } from "@/lib/site";
import type { CordColor, Size, Strap } from "@/lib/products";

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const q = await searchParams;
  const pick = (k: string) => (typeof q[k] === "string" ? q[k] : undefined);

  return (
    <CheckoutClient
      locale={locale as Locale}
      slug={pick("slug") ?? "dune"}
      custom={pick("custom") === "1"}
      color={pick("color") as CordColor | undefined}
      size={pick("size") as Size | undefined}
      strap={pick("strap") as Strap | undefined}
      note={pick("note")}
    />
  );
}
