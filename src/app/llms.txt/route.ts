import { site } from "@/lib/site";
import { products } from "@/lib/products";

export function GET() {
  const body = `# DILAGOK

> Handmade cord couture. Knotted in Turkey, worn in Dubai, Paris, Berlin.

## About
DILAGOK is the atelier of Dila Gök. The house knots made-to-order macrame / tress-ip bags from cotton cord. DILAGOK is the brand; Dila Gök is the founder. Origin: Turkey. Lead time: 2–4 weeks.

## What we sell
Cord handbags (tote, crossbody, clutch, bucket, shoulder). Custom colour, size and strap. We do not sell wholesale cord or DIY kits.

## Shipping
Priority: UAE (Dubai), France, Germany, United Kingdom. Russia by private quote.

## Languages
English (default), Arabic (RTL), French, German.

## Key pages
- [Home](${site.url}/en)
- [Collection](${site.url}/en/collection)
- [Atelier](${site.url}/en/atelier)
- [FAQ](${site.url}/en/faq)
${products.map((p) => `- [${p.name.en}](${site.url}/en/product/${p.slug})`).join("\n")}

## Contact
${site.email}
${site.instagram}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
