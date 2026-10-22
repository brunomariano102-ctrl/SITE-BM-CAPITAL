import { NextRequest, NextResponse } from "next/server";
import { site } from "./lib/site";

export function middleware(request: NextRequest) {
  const officialHost = new URL(site.url).host;
  const isPublicHost = request.headers.get("host") === officialHost;
  const isProduction = process.env.VERCEL_ENV === "production";
  if (!isPublicHost || !isProduction) {
    // Canonical URLs alone do not prevent indexing of alternate deployments.
    if (request.nextUrl.pathname === "/robots.txt") {
      return new NextResponse("User-agent: *\nDisallow: /\n", {
        headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex, nofollow" },
      });
    }
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|assets/).*)"] };
