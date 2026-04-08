import { NextResponse, NextRequest } from "next/server";
import { api } from "@/app/api/api";
import { cookies } from "next/headers";
import { logErrorResponse } from "@/app/api/_utils/utils";
import { isAxiosError } from "axios";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const perPage = request.nextUrl.searchParams.get("perPage") ?? 10;
    const page = request.nextUrl.searchParams.get("page") ?? 1;

    const res = await api(`/users/${id}/public`, {
      params: {
        page,
        perPage,
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
