type Props = {
  className?: string;
  gold?: boolean;
};

export function LogoMark({ className = "h-10 w-auto", gold = false }: Props) {
  return (
    <span
      className={`inline-block bg-current ${gold ? "text-gold" : "text-current"} ${className}`}
      style={{
        aspectRatio: "322 / 402",
        WebkitMaskImage: "url(/brand/logo-mark.png)",
        maskImage: "url(/brand/logo-mark.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
      aria-hidden
    />
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display tracking-[0.46em] text-[0.7rem] uppercase ${className}`}
    >
      DILAGOK
    </span>
  );
}
