import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Optimistic gate: pages also verify the real session on the server.
export function middleware(request: NextRequest) {
  if (!getSessionCookie(request)) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("redirected", "1");
    url.searchParams.set("callbackUrl", request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};
