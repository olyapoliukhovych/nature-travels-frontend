import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { api } from "@/app/api/api";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ token: string }> },
) {
  try {
    const { token } = await context.params;

    const res = await api.get(`/users/verify/${token}`);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || error.message,
        },
        { status: error.response?.status || 500 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
