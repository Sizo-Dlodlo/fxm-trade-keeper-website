import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const publicRoutes = ["/admin/login"];
const apiAuthPrefix = "/api/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isPublicRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }
    return;
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
