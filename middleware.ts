import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/admin/dashboard"];

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const sessionCookies = getSessionCookie(req);
  const res = NextResponse.next();
  const isLoggedIn = !!sessionCookies;
  const isProtectedRoutes = protectedRoutes.includes(nextUrl.pathname);
  const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");

  if (isProtectedRoutes && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }
  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
