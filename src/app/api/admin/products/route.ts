import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { allProducts, upsertProduct } from "@/lib/catalog-store";
import type { Product } from "@/lib/products";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ products: allProducts({ admin: true }) });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const product = (await req.json()) as Product;
  if (!product?.slug || !product?.sku || !product?.name?.en) {
    return NextResponse.json({ error: "slug, sku and English name are required" }, { status: 400 });
  }
  return NextResponse.json({ product: upsertProduct(product) });
}
