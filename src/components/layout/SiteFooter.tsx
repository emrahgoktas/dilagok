import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { site } from "@/lib/site";
import { Wordmark } from "@/components/brand/LogoMark";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const n = await getTranslations("nav");

  return (
    <footer className="border-t border-bone/10 px-5 py-16 text-bone/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <Wordmark className="text-bone" />
          <p className="mt-4 max-w-sm font-display text-lg text-bone/80">
            {site.tagline}
          </p>
          <p className="mt-6 text-xs tracking-widest uppercase">{t("rights")}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <Link href="/collection">{n("collection")}</Link>
            <Link href="/custom/dune">{n("custom")}</Link>
            <Link href="/atelier">{n("atelier")}</Link>
            <Link href="/faq">{n("faq")}</Link>
          </div>
          <div className="flex flex-col gap-2">
            <a href={site.instagram} rel="noreferrer" target="_blank">
              Instagram
            </a>
            <Link href="/shipping/uae">UAE</Link>
            <Link href="/shipping/france">France</Link>
            <Link href="/shipping/germany">Germany</Link>
            <Link href="/shipping/uk">United Kingdom</Link>
            <Link href="/shipping/russia">Russia</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
