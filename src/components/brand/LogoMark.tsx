type Props = {
  className?: string;
  gold?: boolean;
};

export function LogoMark({ className = "h-10 w-8", gold = false }: Props) {
  return (
    <svg
      viewBox="0 0 120 148"
      fill="none"
      className={className}
      aria-hidden
    >
      <g
        className={gold ? "text-gold" : "text-current"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M34 16c-3 6-5.5 16-5.5 28.5v59c0 12 3.2 22 8.8 28.5"
          strokeWidth="5.2"
        />
        <path
          d="M37.2 16.8c18 8.5 38.5 28 42.8 58.2 3.2 22.4-6.6 43.2-24.8 55.2"
          strokeWidth="4.4"
        />
        <path
          d="M86 16c3 6 5.5 16 5.5 28.5v59c0 12-3.2 22-8.8 28.5"
          strokeWidth="5.2"
        />
        <path
          d="M82.8 16.8c-18 8.5-38.5 28-42.8 58.2-3.2 22.4 6.6 43.2 24.8 55.2"
          strokeWidth="4.4"
        />
      </g>
    </svg>
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
