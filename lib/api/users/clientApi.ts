import {
  PaginationParams,
  RequestParamsGetUserById,
  StoriesResponse,
} from "@/types/stories";
import { api } from "../api";
import {
  MovementToFavoritesResponse,
  User,
  UserPublicProfileResponse,
  UsersResponse,
} from "@/types/user";

export const getAllUsers = async ({
  page,
  perPage,
}: PaginationParams): Promise<UsersResponse> => {
  const res = await api.get<UsersResponse>("/users", {
    params: { page, perPage },
  });

  return res.data;
};

export const getUserByIdPublic = async ({
  userId,
  page,
  perPage,
}: RequestParamsGetUserById): Promise<UserPublicProfileResponse> => {
  const res = await api.get<UserPublicProfileResponse>(`/users/${userId}`, {
    params: { page, perPage },
  });

  return res.data;
};

export const getUserProfile = async (): Promise<User> => {
  const res = await api.get<User>("/users/me");

  return res.data;
};

export const addStoryToFavorites = async (
  storyId: string,
): Promise<MovementToFavoritesResponse> => {
  const res = await api.post<MovementToFavoritesResponse>(
    `/users/${storyId}/save`,
  );

  return res.data;
};

export const deleteStoryToFavorites = async (
  storyId: string,
): Promise<MovementToFavoritesResponse> => {
  const res = await api.delete<MovementToFavoritesResponse>(
    `/users/${storyId}/save`,
  );

  return res.data;
};

export const getUserStories = async ({
  page,
  perPage,
}: PaginationParams): Promise<StoriesResponse> => {
  const res = await api.get<StoriesResponse>(`/users/created`, {
    params: { perPage, page },
  });

  return res.data;
};

export const getUserStoriesFavorites = async ({
  page,
  perPage,
}: PaginationParams): Promise<StoriesResponse> => {
  const res = await api.get<StoriesResponse>(`/users/saved`, {
    params: { perPage, page },
  });

  return res.data;
};
