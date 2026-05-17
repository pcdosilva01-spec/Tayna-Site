import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth;
  const isAuthPage = pathname.startsWith("/admin/login") || pathname.startsWith("/conta/login");
  const isAdminRoute = pathname.startsWith("/admin");
  
  // Protect admin routes
  if (isAdminRoute && !isAuthPage) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    // Check role if needed
    if ((req.auth?.user as any)?.role !== "ADMIN") {
      // If we had a generic user role trying to access admin
      return NextResponse.redirect(new URL("/conta/login", req.url));
    }
  }

  // Security headers
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Content-Security-Policy",
    "frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://checkout.stripe.com;"
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|api).*)",
  ],
};
