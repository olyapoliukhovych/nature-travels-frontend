import { NewStoryData } from "@/types/stories";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type NewStoryDraftStore = {
  draft: NewStoryData;
  setDraft: (story: NewStoryData) => void;
  clearDraft: () => void;
};

const initialDraft: NewStoryData = {
  categoryId: "",
  title: "",
  article: "",
};

export const useStoryDraftStore = create<NewStoryDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (story) =>
        set((state) => ({
          draft: { ...state.draft, ...story },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "story-draft-storage",
    },
  ),
);
