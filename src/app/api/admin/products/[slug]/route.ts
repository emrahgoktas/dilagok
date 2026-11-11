import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getProduct, removeProduct, upsertProduct } from "@/lib/catalog-store";
import type { Product } from "@/lib/products";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const product = getProduct(slug, { admin: true });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const product = (await req.json()) as Product;
  product.slug = slug;
  return NextResponse.json({ product: upsertProduct(product) });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  removeProduct(slug);
  return NextResponse.json({ ok: true });
}
