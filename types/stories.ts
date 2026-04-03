import { CategoryStory } from "../types/category";

export interface CategoryResponse {
  _id: string;
  name: string;
}

export interface Story {
  savedCount: number;
  _id: string;
  img: string;
  title: string;
  article: string;
  category: CategoryStory;
  rate: number;
  ownerId: string;
  date: string;
  favoritesCount?: number;
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
