import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const basicAuth = request.headers.get("authorization");
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.warn("Atenção: ADMIN_PASSWORD não configurada no .env");
    }

    let isAuthenticated = false;

    if (basicAuth) {
      try {
        const authValue = basicAuth.split(" ")[1];
        const [user, pwd] = atob(authValue).split(":");
        if (adminPassword && pwd === adminPassword) {
          isAuthenticated = true;
        }
      } catch (e) {
        // Invalid base64
      }
    }

    if (!isAuthenticated) {
      return new NextResponse("Acesso Negado. Senha Incorreta.", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Área Administrativa"',
        },
      });
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
