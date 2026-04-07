import {
  LoginParams,
  LogoutResponse,
  RefreshSessionResponse,
  RegisterParams,
} from "@/types/auth";
import { User } from "@/types/user";
import { api } from "../api";
import { cookies } from "next/headers";

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterParams): Promise<User> => {
  const cookie = await cookies();

  const res = await api.post<User>(
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
}: LoginParams): Promise<User> => {
  const cookie = await cookies();

  const res = await api.post<User>(
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

export const refreshSession = async (): Promise<RefreshSessionResponse> => {
  const cookie = await cookies();

  const res = await api.post<RefreshSessionResponse>("auth/refresh", null, {
    headers: {
      Cookie: cookie.toString(),
    },
  });

  return res.data;
};
