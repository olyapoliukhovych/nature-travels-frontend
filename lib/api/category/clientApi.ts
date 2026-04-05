import { Category } from "@/types/category";
import { api } from "../api";

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get<Category[]>("/categories");
  return res.data;
};
