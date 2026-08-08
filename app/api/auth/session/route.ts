import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";
import { AUTH_COOKIES } from "@/constants/auth";

export async function GET() {
  const createClearResponse = () => {
    const response = NextResponse.json({ success: false }, { status: 200 });
    for (const name of AUTH_COOKIES) {
      response.cookies.set(name, "", { maxAge: 0, path: "/" });
    }
    return response;
  };

  const handleSetCookies = (setCookieHeader: string | string[]) => {
    const response = NextResponse.json({ success: true }, { status: 200 });
    const cookieArray = Array.isArray(setCookieHeader)
      ? setCookieHeader
      : [setCookieHeader];

    for (const cookieStr of cookieArray) {
      response.headers.append("Set-Cookie", cookieStr);
    }
    return response;
  };

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (accessToken) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (refreshToken) {
      const apiRes = await api.get("auth/refresh", {
        headers: { Cookie: cookieStore.toString() },
      });

      const setCookieHeader = apiRes.headers["set-cookie"];
      if (setCookieHeader) {
        return handleSetCookies(setCookieHeader);
      }
    }

    return createClearResponse();
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      const setCookieHeader = error.response?.headers["set-cookie"];

      if (setCookieHeader) {
        return handleSetCookies(setCookieHeader);
      }
    } else {
      logErrorResponse({ message: (error as Error).message });
    }

    return createClearResponse();
  }
}
