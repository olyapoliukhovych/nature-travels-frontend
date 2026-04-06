import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/profile", "/stories/new"];
const authRoutes = ["/auth/login", "/auth/register"];

export function proxy(request: NextRequest) {
  const { cookies, nextUrl } = request;
  const accessToken = cookies.get("accessToken")?.value;

  const isPublicRoute = authRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );

  // Якщо немає токена і роут приватний — на логін
  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Якщо токен є і роут публічний (логін/реєстрація) — на головну
  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/stories/new", "/auth/login", "/auth/register"],
};
