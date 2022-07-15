import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  if (pathname === "/favicon.ico") {
    return NextResponse.next();
  }
  if (pathname !== "/" && !pathname.includes("/room/")) {
    return NextResponse.rewrite(`${origin}/`);
  }
  return NextResponse.next();
}
