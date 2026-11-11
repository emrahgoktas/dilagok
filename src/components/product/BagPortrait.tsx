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
          <g
            transform="translate(86 118) scale(0.065)"
            fill={dark ? "#F4EFE6" : "#0A0A0A"}
            fillRule="evenodd"
          >
            <path d="M357.00 47.00 L318.00 47.00 L283.00 54.00 L261.00 62.00 L238.00 74.00 L211.00 94.00 L183.00 74.00 L164.00 64.00 L143.00 56.00 L119.00 50.00 L97.00 47.00 L64.00 47.00 L62.00 49.00 L63.00 234.00 L100.00 219.00 L100.00 87.00 L102.00 85.00 L120.00 88.00 L149.00 98.00 L170.00 110.00 L183.00 121.00 L182.00 125.00 L174.00 136.00 L161.00 160.00 L152.00 184.00 L147.00 208.00 L145.00 237.00 L149.00 272.00 L158.00 302.00 L169.00 325.00 L184.00 347.00 L184.00 349.00 L159.00 367.00 L128.00 380.00 L96.00 386.00 L64.00 385.00 L62.00 387.00 L62.00 421.00 L64.00 423.00 L97.00 423.00 L120.00 420.00 L140.00 415.00 L182.00 396.00 L209.00 376.00 L213.00 377.00 L225.00 387.00 L247.00 401.00 L283.00 416.00 L322.00 423.00 L356.00 423.00 L358.00 421.00 L357.00 236.00 L328.00 247.00 L322.00 251.00 L322.00 362.00 L321.00 383.00 L319.00 385.00 L302.00 383.00 L275.00 374.00 L259.00 366.00 L247.00 358.00 L236.00 348.00 L252.00 324.00 L263.00 300.00 L270.00 277.00 L275.00 243.00 L274.00 214.00 L266.00 177.00 L251.00 144.00 L238.00 125.00 L237.00 121.00 L247.00 112.00 L263.00 102.00 L277.00 95.00 L298.00 88.00 L322.00 84.00 L357.00 85.00 L359.00 74.00 L359.00 50.00 Z M209.00 151.00 L214.00 155.00 L226.00 176.00 L235.00 205.00 L238.00 226.00 L237.00 254.00 L231.00 280.00 L220.00 306.00 L211.00 319.00 L207.00 316.00 L202.00 308.00 L191.00 285.00 L185.00 264.00 L183.00 251.00 L183.00 220.00 L186.00 201.00 L195.00 175.00 L206.00 154.00 Z" />
          </g>
        ) : null}
      </svg>
    </div>
  );
}
