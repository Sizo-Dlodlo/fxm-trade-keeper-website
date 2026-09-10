import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
);

export async function requireAdmin() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) redirect("/admin/login");
  try {
    await jwtVerify(cookie, secret);
  } catch {
    redirect("/admin/login");
  }
}
