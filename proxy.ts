import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "@/lib/auth0";

const PROTECTED_PREFIXES = ["/box", "/recipes", "/chat", "/settings"];

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export async function proxy(request: NextRequest) {
  const authResponse = await auth0.middleware(request);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/auth")) {
    return authResponse;
  }

  if (pathname === "/") {
    return authResponse;
  }

  if (isProtectedPath(pathname)) {
    const session = await auth0.getSession(request);
    if (!session) {
      const login = new URL("/auth/login", request.url);
      login.searchParams.set("returnTo", pathname);
      return NextResponse.redirect(login);
    }
  }

  return authResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
