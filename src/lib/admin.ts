import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
);

export async function isAdmin(request: NextRequest): Promise<boolean> {
  const cookie = request.cookies.get("session")?.value;
  if (!cookie) return false;
  try {
    await jwtVerify(cookie, secret);
    return true;
  } catch {
    return false;
  }
}
