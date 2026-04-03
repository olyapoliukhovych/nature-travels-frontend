import { api } from "../api";
import { CategoryStory } from "@/types/category";

export const getCategories = async (): Promise<CategoryStory> => {
  const res = await api.get<CategoryStory>("/categories");
  return res.data;
};
