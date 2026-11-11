import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { heroProduct } from "@/lib/products";

export async function SignatureHero() {
  const t = await getTranslations("hero");
  const product = heroProduct();
  const photoSrc = product.cutout ?? product.image ?? "/products/dune-hero.png";

  return (
    <section className="hero-stage relative flex h-dvh flex-col overflow-hidden bg-ink">
      <div className="hero-glow" aria-hidden />

      <div className="hero-mark-slot pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <span className="hero-dg text-bone" aria-hidden />
      </div>

      <div className="relative z-[1] flex min-h-0 flex-1 items-center justify-center px-4 pt-24 pb-36">
        <div className="hero-still-enter relative h-[min(62dvh,560px)] w-[min(92vw,520px)]">
          <div className="hero-still-breath absolute inset-0">
            <Image
              src={photoSrc}
              alt={product.name.en}
              fill
              priority
              sizes="(min-width: 768px) 520px, 92vw"
              className="object-contain object-center"
            />
            <span className="hero-sheen" aria-hidden />
          </div>
        </div>
      </div>

      <div className="hero-copy pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-6 px-5 pb-10 text-center">
        <p className="hero-line font-display text-2xl text-bone md:text-4xl">{t("line")}</p>
        <div className="hero-cta pointer-events-auto flex gap-8 text-[0.65rem] tracking-[0.28em] uppercase text-bone/80">
          <Link href="/collection" className="hover:text-gold">
            {t("shop")}
          </Link>
          <Link href="/custom/dune" className="hover:text-gold">
            {t("commission")}
          </Link>
        </div>
      </div>
    </section>
  );
}
