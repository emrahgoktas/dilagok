import Image from "next/image";
import type { Product } from "@/lib/products";
import { BagPortrait } from "./BagPortrait";
import type { CordColor } from "@/lib/products";

export function ProductMedia({
  product,
  color,
  className = "",
  priority = false,
}: {
  product: Product;
  color?: CordColor;
  className?: string;
  priority?: boolean;
}) {
  if (product.image && !color) {
    return (
      <div className={`relative overflow-hidden bg-ink ${className}`}>
        <Image
          src={product.image}
          alt={product.name.en}
          fill
          sizes="(min-width: 768px) 42vw, 90vw"
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <BagPortrait product={product} color={color} className={className} />
  );
}
