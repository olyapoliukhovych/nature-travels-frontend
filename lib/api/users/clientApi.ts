import { api } from "../api";
import { UsersParams, UsersResponse } from "@/types/user";

export const getAllUsers = async (
  params: UsersParams,
): Promise<UsersResponse> => {
  const res = await api.get<UsersResponse>("/users", { params });

  return res.data;
};
