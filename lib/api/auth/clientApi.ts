import { UserPrivate } from "@/types/user";
import { api } from "../api";
import {
  RegisterParams,
  LogoutResponse,
  RefreshSessionResponse,
  LoginParams,
} from "@/types/auth";

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterParams): Promise<UserPrivate> => {
  const res = await api.post<UserPrivate>("/auth/register", {
    name,
    email,
    password,
  });

  return res.data;
};

export const loginUser = async ({
  email,
  password,
}: LoginParams): Promise<UserPrivate> => {
  const res = await api.post<UserPrivate>("/auth/login", {
    email,
    password,
  });

  return res.data;
};

export const logoutUser = async (): Promise<LogoutResponse> => {
  const res = await api.post<LogoutResponse>("/auth/logout");

  return res.data;
};

export const refreshSession = async (): Promise<RefreshSessionResponse> => {
  const res = await api.post<RefreshSessionResponse>("auth/session");

  return res.data;
};
