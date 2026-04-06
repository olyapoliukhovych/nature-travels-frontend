import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/profile", "/stories/new"];
const authRoutes = ["/auth/login", "/auth/register"];

export async function proxy(request: NextRequest) {
  const { cookies, nextUrl } = request;

  const accessToken = cookies.get("accessToken")?.value;
  const refreshToken = cookies.get("refreshToken")?.value;

  const isPublicRoute = authRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );

  if (!accessToken) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }

  if (accessToken && refreshToken) {
    try {
      const refreshRes = await fetch(
        `${process.env.BACKEND_API_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            cookie: `refreshToken=${refreshToken}; sessionId=${cookies.get("sessionId")?.value}`,
          },
          credentials: "include",
        },
      );

      if (!refreshRes.ok) {
        const res = NextResponse.next();
        res.cookies.delete("accessToken");
        res.cookies.delete("refreshToken");
        res.cookies.delete("sessionId");
        if (isPrivateRoute) {
          return NextResponse.redirect(new URL("/auth/login", request.url));
        }
        return res;
      }

      if (isPublicRoute) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch {
      const res = NextResponse.next();
      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");
      res.cookies.delete("sessionId");
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
      return res;
    }
  }

  if (accessToken && !refreshToken) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/stories/new", "/auth/login", "/auth/register"],
};
