"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type Slide = {
  src: string;
  alt: string;
  caption: string;
  object?: string;
};

const WIDE: Slide[] = [
  { src: "/products/hero-wide-1.jpg", alt: "Dune tote and clutch", caption: "Dune", object: "object-[50%_45%]" },
  { src: "/products/hero-wide-2.jpg", alt: "Handle and buckle", caption: "Handle", object: "object-center" },
  { src: "/products/hero-wide-3.jpg", alt: "Clutch beside the tote", caption: "Pair", object: "object-[40%_60%]" },
];

const TOP: Slide[] = [
  { src: "/products/hero-sq-buckle.jpg", alt: "Cord buckle", caption: "Hardware" },
  { src: "/products/hero-sq-handle.jpg", alt: "Braided handle", caption: "Handle" },
  { src: "/products/hero-sq-tassel.jpg", alt: "Tassel", caption: "Tassel" },
];

const BOTTOM: Slide[] = [
  { src: "/products/hero-sq-clutch.jpg", alt: "Clutch", caption: "Clutch" },
  { src: "/products/hero-sq-weave.jpg", alt: "Cord weave", caption: "Knot" },
  { src: "/products/hero-sq-reed.jpg", alt: "Studio reed", caption: "Light" },
];

function AutoPane({
  slides,
  interval,
  className,
  sizes,
  priority = false,
  caption,
  children,
}: {
  slides: Slide[];
  interval: number;
  className?: string;
  sizes: string;
  priority?: boolean;
  caption?: boolean;
  children?: ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((n) => (n + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, paused, slides.length]);

  const current = slides[index];

  return (
    <div
      className={`hero-pane relative overflow-hidden bg-ink ${className ?? ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => {
        const on = i === index;
        return (
          <div
            key={slide.src}
            className={`hero-slide absolute inset-0 ${on ? "is-on" : ""}`}
            aria-hidden={!on}
          >
            <Image
              src={slide.src}
              alt={on ? slide.alt : ""}
              fill
              priority={priority && i === 0}
              sizes={sizes}
              className={`object-cover ${slide.object ?? "object-center"}`}
            />
          </div>
        );
      })}
      <div className="hero-vignette" />
      {caption ? (
        <p className="hero-caption" key={current.caption}>
          {current.caption}
        </p>
      ) : null}
      <span className="hero-progress" key={index} style={{ animationDuration: `${interval}ms` }} />
      {children}
    </div>
  );
}

export function SignatureHero() {
  const t = useTranslations("hero");
  const lines = [t("headline"), t("line"), t("made")];
  const [line, setLine] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setLine((n) => (n + 1) % lines.length);
    }, 4800);
    return () => window.clearInterval(id);
  }, [lines.length, paused]);

  return (
    <section className="hero-mosaic bg-ink">
      <AutoPane
        slides={WIDE}
        interval={5200}
        priority
        sizes="(min-width: 768px) 68vw, 100vw"
        className="hero-wide min-h-[46vw] md:min-h-0 md:h-full"
      >
        <div
          className="hero-copy"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <p className="hero-kicker">{t("kicker")}</p>
          <h1 className="hero-headline" key={line}>
            {lines[line]}
          </h1>
          <div className="hero-cta">
            <Link href="/collection">{t("shop")}</Link>
            <Link href="/custom/dune">{t("commission")}</Link>
          </div>
        </div>
      </AutoPane>
      <AutoPane
        slides={TOP}
        interval={3400}
        caption
        sizes="(min-width: 768px) 28vw, 50vw"
        className="hero-sq"
      />
      <AutoPane
        slides={BOTTOM}
        interval={4100}
        caption
        sizes="(min-width: 768px) 28vw, 50vw"
        className="hero-sq"
      />
    </section>
  );
}
