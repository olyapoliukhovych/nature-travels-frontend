import { NextRequest, NextResponse } from "next/server";
import { api } from "@/app/api/api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/app/api/_utils/utils";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const categoryId =
      request.nextUrl.searchParams.get("categoryId") ?? undefined;
    const storyId = request.nextUrl.searchParams.get("storyId") ?? undefined;

    const res = await api("/stories/recomend", {
      params: {
        categoryId,
        storyId,
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
