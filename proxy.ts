import { NextResponse, NextRequest } from "next/server";
import { createClient } from "./lib/server/server";

const ADMIN_EMAIL = "ashok.ab.bhattaraii@gmail.com";

export async function proxy(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (user.email !== ADMIN_EMAIL) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (user) {
      const redirectTo = user.email === ADMIN_EMAIL ? "/admin" : "/dashboard";
      const url = request.nextUrl.clone();
      url.pathname = redirectTo;

      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/admin/:path*"],
};
