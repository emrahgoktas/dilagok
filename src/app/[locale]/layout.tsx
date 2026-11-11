import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Noto_Naskh_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { localeDir, site, type Locale } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HideOnAdmin } from "@/components/layout/HideOnAdmin";
import { JsonLd } from "@/components/seo/JsonLd";
import "../globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    metadataBase: new URL(site.url),
    title: {
      default: "DILAGOK — Handmade cord couture",
      template: "%s · DILAGOK",
    },
    description: site.tagline,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: loc === "ar" ? "ar_AE" : loc === "fr" ? "fr_FR" : loc === "de" ? "de_DE" : "en_GB",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "DILAGOK" }],
    },
    twitter: { card: "summary_large_image" },
    other: {
      "pin:rich_pin": "true",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = localeDir[locale as Locale];

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geist.variable} ${cormorant.variable} ${naskh.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-bone">
        <NextIntlClientProvider messages={messages}>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              url: site.url,
              logo: `${site.url}/brand/logo-mark.png`,
              founder: site.founder,
              sameAs: site.sameAs,
              brand: { "@type": "Brand", name: site.name },
            }}
          />
          <HideOnAdmin>
            <SiteHeader />
          </HideOnAdmin>
          {children}
          <HideOnAdmin>
            <SiteFooter />
          </HideOnAdmin>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
