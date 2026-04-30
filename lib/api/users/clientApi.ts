import {
  PaginationParams,
  RequestParamsGetUserById,
  StoriesResponse,
} from "@/types/stories";
import { api } from "../api";
import {
  MovementToFavoritesResponse,
  UserPrivate,
  UserPublic,
  UsersResponse,
} from "@/types/user";
import { AxiosError } from "axios";

export const getAllUsers = async ({
  page,
  perPage,
}: PaginationParams): Promise<UsersResponse> => {
  const res = await api.get<UsersResponse>("/users", {
    params: { page, perPage },
  });

  return res.data;
};

export const getUserByIdPublic = async (
  userId: string,
): Promise<UserPublic> => {
  const res = await api.get<UserPublic>(`/users/${userId}`);

  return res.data;
};

export const getUserStoriesPublic = async ({
  userId,
  page,
  perPage,
}: RequestParamsGetUserById): Promise<StoriesResponse> => {
  const res = await api.get<StoriesResponse>(`/users/${userId}/public`, {
    params: {
      page,
      perPage,
    },
  });

  return res.data;
};

export const getUserProfile = async (): Promise<UserPrivate | null> => {
  try {
    const res = await api.get<UserPrivate>("/users/me");
    return res.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        return null;
      }
    }

    throw error;
  }
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

export const getUserStoriesPrivate = async ({
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

export const updateUser = async (data: { name?: string; email?: string }) => {
  const res = await api.patch("/users/me", data);
  return res.data;
};

export const updateUserAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await api.patch("/users/me/avatar", formData);
  return res.data;
};

export const verifyEmail = async (token: string) => {
  const res = await api.get(`/users/verify/${token}`);
  return res.data;
};

export const deleteUser = async (): Promise<{ message: string }> => {
  const res = await api.delete<{ message: string }>("/users/me");
  return res.data;
};
