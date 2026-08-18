import { type NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/session";

/**
 * Next 16 renamed `middleware` to `proxy`; the exported function must be named
 * `proxy` and the runtime is nodejs only.
 *
 * This is an OPTIMISTIC check — it runs on prefetches too, so it only reads and
 * verifies the cookie. The real authorisation happens again in app/admin/layout.tsx,
 * which is what actually protects the page. The Angular app had no guard at all:
 * /projectform was reachable by URL without logging in.
 */
export async function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !session) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/admin/projects", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
