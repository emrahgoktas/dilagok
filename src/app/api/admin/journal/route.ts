import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { allArticles, upsertArticle } from "@/lib/catalog-store";
import type { Article } from "@/lib/journal";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ articles: allArticles({ admin: true }) });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const article = (await req.json()) as Article;
  if (!article?.slug || !article?.title?.en) {
    return NextResponse.json({ error: "slug and English title are required" }, { status: 400 });
  }
  return NextResponse.json({ article: upsertArticle(article) });
}
