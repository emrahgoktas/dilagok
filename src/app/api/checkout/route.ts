import { NextResponse } from "next/server";
import Stripe from "stripe";
import { customSurcharge, getProduct } from "@/lib/products";
import { site } from "@/lib/site";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    slug: string;
    custom?: boolean;
    color?: string;
    size?: string;
    strap?: string;
    note?: string;
    market?: string;
    locale?: string;
  };

  const product = getProduct(body.slug);
  if (!product) {
    return NextResponse.json({ error: "Unknown piece" }, { status: 400 });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({
      error:
        "Online payment is being connected. Email atelier@dilagok.com to reserve this piece.",
    });
  }

  const stripe = new Stripe(key);
  const amount = (product.priceEur + (body.custom ? customSurcharge : 0)) * 100;
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  const locale = body.locale ?? "en";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${origin}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/${locale}/product/${product.slug}`,
    customer_email: undefined,
    shipping_address_collection: {
      allowed_countries: ["AE", "FR", "DE", "GB", "SA", "QA", "KW", "BH", "OM", "IT", "ES", "NL"],
    },
    metadata: {
      sku: product.sku,
      slug: product.slug,
      custom: body.custom ? "1" : "0",
      color: body.color ?? "",
      size: body.size ?? "",
      strap: body.strap ?? "",
      note: body.note ?? "",
      market: body.market ?? "",
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: amount,
          product_data: {
            name: `DILAGOK ${product.name.en}${body.custom ? " · commission" : ""}`,
            description: `${product.sku} · made to order in Turkey`,
          },
        },
      },
    ],
  });

  return NextResponse.json({ url: session.url });
}
