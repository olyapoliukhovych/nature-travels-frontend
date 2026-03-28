import { api } from "./api";

export async function getAllStories() {
  const res = await api.get("/stories");
  return res.data;
}

export async function getCategories() {
  const res = await api.get("/categories");
  return res.data;
}

export async function getStoriesByCategory(category: string) {
  const res = await api.get(`/stories?category=${category}`);
  return res.data;
}
