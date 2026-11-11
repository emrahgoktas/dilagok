"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { heroProduct } from "@/lib/products";

const CordCanvas = dynamic(() => import("./CordCanvas"), { ssr: false });

export function SignatureHero({ autoplay = false }: { autoplay?: boolean }) {
  const section = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0.02);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);
  const t = useTranslations("hero");
  const product = heroProduct();
  const photoSrc = product.cutout ?? product.image ?? "/products/dune-hero.png";

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    const el = section.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / Math.max(1, total)));
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!autoplay || reduced) return;
    const start = performance.now();
    const dur = 10000;
    const startY = window.scrollY;
    const el = section.current;
    if (!el) return;
    const endY = startY + el.offsetHeight - window.innerHeight;
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / dur);
      const ease = 1 - Math.pow(1 - k, 3);
      window.scrollTo({ top: startY + (endY - startY) * ease });
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoplay, reduced]);

  const photo = Math.max(0, (progress - 0.56) / 0.3);
  const copy = Math.max(0, (progress - 0.86) / 0.1);
  const cords = reduced ? 0 : Math.max(0, 1 - Math.pow(Math.min(1, photo), 1.45));
  const bag = Math.min(1, photo);

  return (
    <section ref={section} className="relative h-[320vh] bg-ink">
      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">
        {!reduced ? (
          <div
            className="absolute inset-0"
            style={{ opacity: cords }}
            onMouseMove={(e) => {
              const x = (e.clientX / window.innerWidth) * 2 - 1;
              const y = (e.clientY / window.innerHeight) * 2 - 1;
              setMouse({ x, y });
            }}
            onMouseLeave={() => setMouse({ x: 0, y: 0 })}
          >
            <CordCanvas progress={Math.min(progress, 0.9)} mouse={mouse} />
          </div>
        ) : null}

        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            opacity: reduced ? 1 : bag,
            transform: `translate(-6%, ${(1 - bag) * 22}px) scale(${0.9 + bag * 0.1})`,
          }}
        >
          <div className="relative h-[min(82dvh,720px)] w-[min(94vw,640px)]">
            <Image
              src={photoSrc}
              alt={product.name.en}
              fill
              priority
              sizes="640px"
              className="object-contain object-center"
              style={{
                filter: `drop-shadow(0 28px 48px rgba(0,0,0,${0.45 * bag}))`,
              }}
            />
          </div>
        </div>

        <p
          className="absolute bottom-24 left-0 right-0 text-center font-display text-2xl text-bone md:text-4xl"
          style={{ opacity: reduced ? 1 : copy }}
        >
          {t("line")}
        </p>

        <div
          className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 text-[0.65rem] tracking-[0.28em] uppercase text-bone/80"
          style={{
            opacity: reduced ? 1 : copy,
            pointerEvents: copy > 0.2 || reduced ? "auto" : "none",
          }}
        >
          <Link href="/collection">{t("shop")}</Link>
          <Link href="/custom/dune">{t("commission")}</Link>
        </div>

        <p
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.6rem] tracking-[0.32em] uppercase text-bone/40"
          style={{ opacity: 1 - photo * 1.4 }}
        >
          {t("scroll")}
        </p>
      </div>
    </section>
  );
}
