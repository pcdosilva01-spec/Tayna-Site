import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!pathname.startsWith("/admin/login")) {
      const adminAuthCookie = request.cookies.get("admin_auth");

      if (!adminAuthCookie || adminAuthCookie.value !== "true") {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }
  }

  // Security headers
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|api).*)",
  ],
};
