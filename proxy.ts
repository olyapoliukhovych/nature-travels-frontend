import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIES } from "./constants/auth";
import { refreshSession } from "@/lib/api/auth/serverApi";

const privateRoutes = ["/profile", "/stories/new"];
const authRoutes = ["/auth/login", "/auth/register"];

const clearCookies = (response: NextResponse) => {
  for (const name of AUTH_COOKIES) {
    response.cookies.set(name, "", { maxAge: 0, path: "/" });
  }
  return response;
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const sessionId = cookieStore.get("sessionId")?.value;

  const isPublicRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken && refreshToken && sessionId) {
    const apiRes = await refreshSession();

    if (apiRes.data.success) {
      const setCookieHeader = apiRes.headers["set-cookie"];
      const response = NextResponse.next({
        request: { headers: request.headers },
      });

      if (setCookieHeader) {
        const cookieArray = Array.isArray(setCookieHeader)
          ? setCookieHeader
          : [setCookieHeader];

        for (const cookieStr of cookieArray) {
          response.headers.append("Set-Cookie", cookieStr);
        }
      }
      return response;
    }
  }

  if (isPrivateRoute && !accessToken) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    return clearCookies(response);
  }

  if (isPublicRoute && (accessToken || sessionId)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
