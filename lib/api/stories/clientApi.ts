import { UsersParams, UsersResponse } from "@/types/user";
import { api } from "../api";
import {
  StoriesParams,
  StoriesResponse,
  Story,
  StoryById,
  StoryCreate,
} from "@/types/stories";

export const getAllStories = async (
  params: StoriesParams,
): Promise<StoriesResponse> => {
  const res = await api.get<StoriesResponse>("/stories", { params });
  return res.data;
};

export const getStoryById = async ({ id }: StoryById): Promise<Story> => {
  const res = await api.get<Story>(`/stories/${id}`);
  return res.data;
};

export const createStory = async ({
  category,
  title,
  article,
  img,
}: StoryCreate): Promise<Story> => {
  const formData = new FormData();

  formData.append("category", category);
  formData.append("title", title);
  formData.append("article", article);

  if (img) {
    formData.append("img", img);
  }

  const res = await api.post<Story>("/stories", formData);
  return res.data;
};
