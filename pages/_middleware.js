import { NextResponse } from "next/server";
export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  if (pathname === "/favicon.ico") {
    return NextResponse.next();
  }
  if (pathname !== "/" && !pathname.includes("/room/")) {
    console.log(pathname);
    return NextResponse.rewrite(`${origin}/`);
  }
  return NextResponse.next();
}
