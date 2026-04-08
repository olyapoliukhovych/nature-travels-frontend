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
}: StoryCreate): Promise<CreateStoryResponse> => {
  const formData = new FormData();

  formData.append("categoryId", categoryId);
  formData.append("title", title);
  formData.append("article", article);

  if (img) {
    formData.append("img", img);
  }

  const res = await api.post<CreateStoryResponse>("/stories", formData);
  return res.data;
};
