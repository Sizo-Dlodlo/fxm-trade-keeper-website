import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
);

const publicRoutes = ["/admin/login"];
const apiAuthPrefix = "/api/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(apiAuthPrefix)) return;

  const sessionCookie = request.cookies.get("session")?.value;

  let isLoggedIn = false;
  if (sessionCookie) {
    try {
      await jwtVerify(sessionCookie, secret);
      isLoggedIn = true;
    } catch {
      isLoggedIn = false;
    }
  }

  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return;
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
