import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { site } from "@/lib/site";

const PLATFORMS = [
  "instagram",
  "pinterest",
  "facebook",
  "tiktok",
  "telegram",
  "threads",
] as const;

export async function POST(req: Request) {
  const admin = process.env.ADMIN_SECRET;
  const token = req.headers.get("x-admin-secret");
  if (!admin || token !== admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.AYRSHARE_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Set AYRSHARE_API_KEY" }, { status: 400 });
  }

  const body = (await req.json()) as {
    slug: string;
    caption?: string;
    platforms?: string[];
    mediaUrl?: string;
  };

  const product = getProduct(body.slug);
  const url = `${site.url}/en/product/${body.slug}`;
  const post = `${body.caption ?? product?.summary.en ?? "DILAGOK"}\n${url}`;
  const platforms = (body.platforms ?? [...PLATFORMS]).filter((p) =>
    PLATFORMS.includes(p as (typeof PLATFORMS)[number]),
  );

  const res = await fetch("https://api.ayrshare.com/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      post,
      platforms,
      mediaUrls: body.mediaUrl ? [body.mediaUrl] : undefined,
    }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
