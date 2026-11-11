import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { heroProduct } from "@/lib/products";

export async function SignatureHero() {
  const t = await getTranslations("hero");
  const product = heroProduct();
  const photoSrc = product.image ?? "/products/dune-hero.jpg";

  return (
    <section className="relative h-dvh overflow-hidden bg-ink">
      <div className="hero-film absolute inset-0">
        <Image
          src={photoSrc}
          alt={product.name.en}
          fill
          priority
          sizes="100vw"
          className="hero-film-img object-cover object-[58%_42%]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/50" />

      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-4 px-6 pb-16 pt-32 md:gap-5 md:px-12 md:pb-14">
        <p className="text-[0.65rem] tracking-[0.38em] uppercase text-gold">{t("kicker")}</p>
        <h1 className="max-w-xl font-display text-4xl leading-[1.05] text-bone md:text-6xl lg:text-7xl">
          {t("headline")}
        </h1>
        <p className="font-display text-lg text-bone/75 md:text-2xl">{t("line")}</p>
        <div className="mt-2 flex flex-wrap gap-8 text-[0.65rem] tracking-[0.28em] uppercase text-bone/85">
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
