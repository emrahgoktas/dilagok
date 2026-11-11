import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, isValidSecret } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Set ADMIN_SECRET" }, { status: 500 });
  }
  const body = (await req.json()) as { secret?: string };
  if (!body.secret || !isValidSecret(body.secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = adminToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token!, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
