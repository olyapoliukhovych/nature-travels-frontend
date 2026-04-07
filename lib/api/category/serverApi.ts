import { Category } from "@/types/category";
import { api } from "../api";
import { cookies } from "next/headers";

export const getCategories = async (): Promise<Category[]> => {
  const cookie = await cookies();

  const res = await api.get<Category[]>("/categories", {
    headers: {
      Cookie: cookie.toString(),
    },
  });
  return res.data;
};
