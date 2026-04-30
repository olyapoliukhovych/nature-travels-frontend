import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { api } from "../../api";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const formData = await req.formData();

    const res = await api.patch("/users/me/avatar", formData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
