import { Category } from "./category";

export interface CategoryResponse {
  _id: string;
  name: string;
}

export interface Story {
  article: string;
  category: Category;
  date: string;
  img: string;
  ownerId: Owner;
  rate: number;
  title: string;
  _id: string;
  favoritesCount: number;
}

interface Owner {
  _id: string;
  name: string;
}

export interface StoriesParams {
  page: number;
  perPage: number;
  category?: string;
}

export interface StoriesResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  category: CategoryResponse | null;
  stories: Story[];
}

export interface StoryById {
  id: string;
}

export interface StoryCreate {
  category: string;
  title: string;
  article: string;
  img: File | null;
}
