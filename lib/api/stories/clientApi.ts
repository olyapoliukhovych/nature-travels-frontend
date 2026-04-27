import { api } from "../api";
import {
  CreateStoryValues,
  GategoryRecomendParams,
  RequestParamsGetAllStories,
  StoriesResponse,
  Story,
} from "@/types/stories";

export const getAllStories = async ({
  page,
  perPage,
  categoryId,
}: RequestParamsGetAllStories): Promise<StoriesResponse> => {
  const res = await api.get<StoriesResponse>("/stories", {
    params: {
      page,
      perPage,
      categoryId,
    },
  });
  return res.data;
};

export const getRecomendStories = async ({
  categoryId,
  storyId,
}: GategoryRecomendParams): Promise<Story[]> => {
  const res = await api.get<Story[]>("/stories/recomend", {
    params: {
      categoryId,
      storyId,
    },
  });

  return res.data;
};

export const getStoryById = async (storyId: string): Promise<Story> => {
  const res = await api.get<Story>(`/stories/${storyId}`);
  return res.data;
};

export const createStory = async ({
  categoryId,
  title,
  article,
  img,
}: CreateStoryValues): Promise<Story> => {
  const formData = new FormData();

  formData.append("categoryId", categoryId);
  formData.append("title", title);
  formData.append("article", article);

  if (img) {
    formData.append("img", img);
  }

  const res = await api.post<Story>("/stories", formData);
  return res.data;
};

export const updateStory = async (
  storyId: string,
  { categoryId, title, article, img }: CreateStoryValues,
): Promise<Story> => {
  const formData = new FormData();

  formData.append("categoryId", categoryId);
  formData.append("title", title);
  formData.append("article", article);

  if (img) {
    formData.append("img", img);
  }

  const res = await api.patch<Story>(`/stories/${storyId}`, formData);
  return res.data;
};

export const deleteStory = async (storyId: string): Promise<unknown> => {
  const res = await api.delete(`/stories/${storyId}`);
  return res.data;
};
