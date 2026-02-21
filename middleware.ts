import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = process.env.ADMIN_COOKIE_NAME || "zf_admin";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Solo proteger /admin (pero dejar libre login y logout)
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/login")) return NextResponse.next();
  if (pathname.startsWith("/admin/logout")) return NextResponse.next();

  const token = req.cookies.get(COOKIE_NAME)?.value;

  // Si no hay sesión, manda a login
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};