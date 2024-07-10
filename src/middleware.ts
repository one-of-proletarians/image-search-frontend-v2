import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  if (token && (pathname === "/login" || pathname === "/register")) {
    // Перенаправляем пользователя на главную страницу (или на любую другую)
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Определение путей, к которым применяется middleware
export const config = {
  matcher: ["/login", "/register"],
};
