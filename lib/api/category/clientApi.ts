import { Category } from "@/types/category";
import { api } from "../api";
import { CategoryStoryResponse } from "@/types/category";

export const getCategories = async (): Promise<CategoryStoryResponse[]> => {
  const res = await api.get<CategoryStoryResponse[]>("/categories");
  return res.data;
};
