import { cookies } from "next/headers";
import { createHash } from "crypto";

export const ADMIN_COOKIE = "dg_admin";

export function adminToken() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return null;
  return createHash("sha256").update(secret).digest("hex");
}

export function isValidSecret(secret: string) {
  return Boolean(process.env.ADMIN_SECRET) && secret === process.env.ADMIN_SECRET;
}

export async function isAdmin() {
  const token = adminToken();
  if (!token) return false;
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === token;
}
