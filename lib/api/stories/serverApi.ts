import { cookies } from "next/headers";
import { api } from "../api";
import {
  CreateStoryResponse,
  GategoryRecomendParams,
  RequestParamsGetAllStories,
  StoriesResponse,
  Story,
  StoryCreate,
} from "@/types/stories";

export const getAllStories = async ({
  page,
  perPage,
  categoryId,
}: RequestParamsGetAllStories): Promise<StoriesResponse> => {
  const cookie = await cookies();

  const res = await api.get<StoriesResponse>("/stories", {
    params: {
      page,
      perPage,
      categoryId,
    },
    headers: {
      Cookie: cookie.toString(),
    },
  });
  return res.data;
};

export const getRecomendStories = async ({
  categoryId,
  storyId,
}: GategoryRecomendParams): Promise<Story[]> => {
  const cookie = await cookies();

  const res = await api.get<Story[]>("/stories/recomend", {
    params: {
      categoryId,
      storyId,
    },
    headers: {
      Cookie: cookie.toString(),
    },
  });

  return res.data;
};

export const getStoryById = async (storyId: string): Promise<Story> => {
  const cookie = await cookies();

  const res = await api.get<Story>(`/stories/${storyId}`, {
    headers: {
      Cookie: cookie.toString(),
    },
  });
  return res.data;
};

export const createStory = async ({
  categoryId,
  title,
  article,
  img,
}: StoryCreate): Promise<CreateStoryResponse> => {
  const cookie = await cookies();

  const formData = new FormData();

  formData.append("categoryId", categoryId);
  formData.append("title", title);
  formData.append("article", article);

  if (img) {
    formData.append("img", img);
  }

  const res = await api.post<CreateStoryResponse>("/stories", formData, {
    headers: {
      Cookie: cookie.toString(),
    },
  });
  return res.data;
};
