import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/profile", "/stories/new"];
const authRoutes = ["/auth/login", "/auth/register"];

export async function proxy(request: NextRequest) {
  const { cookies, nextUrl } = request;

  const accessToken = cookies.get("accessToken")?.value;
  const refreshToken = cookies.get("refreshToken")?.value;
  const sessionId = cookies.get("sessionId")?.value;

  const isPublicRoute = authRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );

  // логіка рефрешу
  if (!accessToken && refreshToken && sessionId) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
        {
          method: "POST",
          headers: {
            Cookie: `refreshToken=${refreshToken}; sessionId=${sessionId}`,
          },
        },
      );

      if (response.ok) {
        const nextResponse = NextResponse.next();
        const setCookieHeader = response.headers.get("set-cookie");
        if (setCookieHeader) {
          nextResponse.headers.set("set-cookie", setCookieHeader);
        }
        return nextResponse;
      }
    } catch (error) {
      console.error("Proxy refresh error:", error);
    }
  }

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
