import { LoginParams, LogoutResponse, RegisterParams } from "@/types/auth";
import { UserPrivate } from "@/types/user";
import { api } from "../api";
import { cookies } from "next/headers";
import { AxiosResponse } from "axios";

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterParams): Promise<UserPrivate> => {
  const cookie = await cookies();

  const res = await api.post<UserPrivate>(
    "/auth/register",
    {
      name,
      email,
      password,
    },
    {
      headers: {
        Cookie: cookie.toString(),
      },
    },
  );

  return res.data;
};

export const loginUser = async ({
  email,
  password,
}: LoginParams): Promise<UserPrivate> => {
  const cookie = await cookies();

  const res = await api.post<UserPrivate>(
    "/auth/login",
    { email, password },
    {
      headers: {
        Cookie: cookie.toString(),
      },
    },
  );

  return res.data;
};

export const logoutUser = async (): Promise<LogoutResponse> => {
  const cookie = await cookies();

  const res = await api.post<LogoutResponse>("/auth/logout", null, {
    headers: {
      Cookie: cookie.toString(),
    },
  });

  return res.data;
};

export const refreshSession = async (): Promise<AxiosResponse> => {
  const cookie = await cookies();

  const res = await api.get<AxiosResponse>("auth/session", {
    headers: {
      Cookie: cookie.toString(),
    },
  });

  return res;
};
