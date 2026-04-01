import { api } from "../api";

interface Category {
  _id: string;
  category: string;
}

interface Stories {
  savedCount: number;
  _id: string;
  img: string;
  title: string;
  article: string;
  category: Category;
  rate: number;
  ownerId: string;
  date: string;
  favoritesCount: number;
}

interface StoriesParams {
  page: number;
  perPage: number;
}

interface StoriesResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  stories: Stories[];
}

export const getAllStories = async (
  params: StoriesParams,
): Promise<StoriesResponse> => {
  const res = await api.get<StoriesResponse>("/stories", { params });
  return res.data;
};

export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};

export const getStoriesByCategory = async (category: string) => {
  const res = await api.get(`/stories?category=${category}`);
  return res.data;
};
