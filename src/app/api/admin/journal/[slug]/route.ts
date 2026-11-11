import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getArticle, removeArticle, upsertArticle } from "@/lib/catalog-store";
import type { Article } from "@/lib/journal";

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const article = (await req.json()) as Article;
  article.slug = slug;
  return NextResponse.json({ article: upsertArticle(article) });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  removeArticle(slug);
  return NextResponse.json({ ok: true });
}
