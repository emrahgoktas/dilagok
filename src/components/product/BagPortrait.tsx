import type { Product } from "@/lib/products";
import { cordPalette, type CordColor } from "@/lib/products";

export function BagPortrait({
  product,
  color,
  className = "",
  stamped = false,
}: {
  product: Product;
  color?: CordColor;
  className?: string;
  stamped?: boolean;
}) {
  const hex = cordPalette[color ?? product.colors[0]].hex;
  const dark = hex === "#0A0A0A";
  const shape = product.silhouette;

  return (
    <div
      className={`relative overflow-hidden bg-ink ${className}`}
      style={{ background: "radial-gradient(ellipse at 50% 30%, #1a1714 0%, #0A0A0A 70%)" }}
    >
      <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden>
        <defs>
          <pattern id={`knot-${product.sku}`} width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 8 L8 0" stroke={hex} strokeWidth="0.6" opacity="0.35" />
            <path d="M0 0 Q4 4 8 8" stroke={hex} strokeWidth="0.5" opacity="0.5" />
          </pattern>
        </defs>
        {shape === "tote" || shape === "shoulder" ? (
          <>
            <path
              d="M70 70 C70 48 130 48 130 70 L138 170 C138 188 62 188 62 170 Z"
              fill={`url(#knot-${product.sku})`}
              stroke={hex}
              strokeWidth="2.2"
            />
            <path d="M78 70 C78 88 122 88 122 70" fill="none" stroke={hex} strokeWidth="2" />
            <path d="M85 52 C85 38 115 38 115 52" fill="none" stroke={hex} strokeWidth="2.4" />
            {Array.from({ length: 7 }).map((_, i) => (
              <path
                key={i}
                d={`M${70 + i * 8} 170 q3 14 0 22`}
                fill="none"
                stroke={hex}
                strokeWidth="1.1"
                opacity="0.85"
              />
            ))}
          </>
        ) : null}
        {shape === "clutch" ? (
          <path
            d="M48 100 H152 V148 C152 162 48 162 48 148 Z"
            fill={`url(#knot-${product.sku})`}
            stroke={hex}
            strokeWidth="2"
          />
        ) : null}
        {shape === "crossbody" ? (
          <>
            <path d="M100 28 C40 70 48 90 78 108" fill="none" stroke={hex} strokeWidth="2" />
            <ellipse cx="100" cy="148" rx="38" ry="42" fill={`url(#knot-${product.sku})`} stroke={hex} strokeWidth="2" />
          </>
        ) : null}
        {shape === "bucket" ? (
          <>
            <path
              d="M68 90 H132 L124 178 C120 192 80 192 76 178 Z"
              fill={`url(#knot-${product.sku})`}
              stroke={hex}
              strokeWidth="2"
            />
            <path d="M74 102 H126" stroke={hex} strokeWidth="1.5" />
          </>
        ) : null}
        {stamped ? (
          <g transform="translate(86 118)">
            <mask id={`stamp-${product.sku}`} maskUnits="userSpaceOnUse">
              <image href="/brand/logo-mark.png" width="24" height="30" />
            </mask>
            <rect
              width="24"
              height="30"
              fill={dark ? "#F4EFE6" : "#0A0A0A"}
              mask={`url(#stamp-${product.sku})`}
            />
          </g>
        ) : null}
      </svg>
    </div>
  );
}
