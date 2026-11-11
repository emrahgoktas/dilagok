import { redirect } from "next/navigation";

export default async function ShippingIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/shipping/uae`);
}
