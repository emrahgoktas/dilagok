import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { isAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }
  const ext = path.extname(file.name || "").toLowerCase() || ".jpg";
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    return NextResponse.json({ error: "Use jpg, png or webp" }, { status: 400 });
  }
  const buf = Buffer.from(await file.arrayBuffer());
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), buf);
  return NextResponse.json({ url: `/uploads/${name}`, bytes: buf.length });
}
