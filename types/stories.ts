import { CategoryStoryResponse } from "../types/category";

export interface OwnerIdPopulate {
  name: string;
  _id: string;
}

export interface Story {
  savedCount: number;
  _id: string;
  img: string;
  title: string;
  article: string;
  categoryId: CategoryStoryResponse | string;
  rate: number;
  ownerId: OwnerIdPopulate | string;
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