import { Category } from "../types/category";
import { RefreshSessionResponse } from "./auth";
import { MovementToFavoritesResponse } from "./user";

export interface OwnerIdPopulate {
  name: string;
  _id: string;
}

export interface GategoryRecomendParams {
  categoryId: string;
  storyId: string;
}

export interface Story {
  savedCount: number;
  _id: string;
  img: string;
  title: string;
  article: string;
  categoryId: Category;
  ownerId: OwnerIdPopulate;
  date: string;
}

export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface RequestParamsGetUserById extends PaginationParams {
  userId: string;
}

export interface RequestParamsGetAllStories extends PaginationParams {
  categoryId?: string;
}

export interface CreateStoryResponse
  extends RefreshSessionResponse, MovementToFavoritesResponse {}

export interface StoriesResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  stories: Story[];
}

export interface StoryCreate {
  categoryId: string;
  title: string;
  article: string;
  img: File | null;
}

export type NewStoryData = {
  categoryId: string;
  title: string;
  article: string;
};
