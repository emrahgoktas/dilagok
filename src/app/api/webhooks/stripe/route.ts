import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!secret || !key) {
    return NextResponse.json({ received: true, skipped: true });
  }

  const stripe = new Stripe(key);
  const raw = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "no signature" }, { status: 400 });

  try {
    const event = stripe.webhooks.constructEvent(raw, sig, secret);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.info("DILAGOK order", session.metadata, session.customer_details?.email);
    }
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }

  return NextResponse.json({ received: true });
}
