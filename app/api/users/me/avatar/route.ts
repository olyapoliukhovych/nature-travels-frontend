import { NextResponse } from "next/server";
import { api } from "@/app/api/api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

export async function PATCH(req: Request) {
  try {
    const formData = await req.formData();
    const cookieStore = await cookies();

    const res = await api.patch("/users/me/avatar", formData, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
