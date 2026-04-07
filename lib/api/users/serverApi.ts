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
import { cookies } from "next/headers";

export const getAllUsers = async ({
  page,
  perPage,
}: PaginationParams): Promise<UsersResponse> => {
  const cookie = await cookies();

  const res = await api.get<UsersResponse>("/users", {
    params: { page, perPage },
    headers: {
      Cookie: cookie.toString(),
    },
  });

  return res.data;
};

// перша версія
// export const getUserByIdPublic = async (userId: string): Promise<User> => {
//   const cookie = await cookies();

//   const res = await api.get<User>(`/users/${userId}`, {
//     headers: {
//       Cookie: cookie.toString(),
//     },
//   });

//   return res.data;
// };

export const getUserByIdPublic = async ({
  userId,
  page,
  perPage,
}: RequestParamsGetUserById): Promise<UserPublicProfileResponse> => {
  const cookieStore = await cookies();

  const res = await api.get<UserPublicProfileResponse>(`/users/${userId}`, {
    params: { page, perPage },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const getUserStoriesPublic = async () => {};

export const getUserProfile = async (): Promise<User> => {
  const cookie = await cookies();

  const res = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookie.toString(),
    },
  });

  return res.data;
};

export const addStoryToFavorites = async (
  storyId: string,
): Promise<MovementToFavoritesResponse> => {
  const cookie = await cookies();

  const res = await api.post<MovementToFavoritesResponse>(
    `/users/${storyId}/save`,
    null,
    {
      headers: {
        Cookie: cookie.toString(),
      },
    },
  );

  return res.data;
};

export const deleteStoryToFavorites = async (
  storyId: string,
): Promise<MovementToFavoritesResponse> => {
  const cookie = await cookies();

  const res = await api.delete<MovementToFavoritesResponse>(
    `/users/${storyId}/save`,
    {
      headers: {
        Cookie: cookie.toString(),
      },
    },
  );

  return res.data;
};

export const getUserStoriesPrivate = async ({
  page,
  perPage,
}: PaginationParams): Promise<StoriesResponse> => {
  const cookie = await cookies();

  const res = await api.get<StoriesResponse>(`/users/created`, {
    params: { perPage, page },
    headers: {
      Cookie: cookie.toString(),
    },
  });

  return res.data;
};

export const getUserStoriesFavorites = async ({
  page,
  perPage,
}: PaginationParams): Promise<StoriesResponse> => {
  const cookie = await cookies();

  const res = await api.get<StoriesResponse>(`/users/saved`, {
    params: { perPage, page },
    headers: {
      Cookie: cookie.toString(),
    },
  });

  return res.data;
};
