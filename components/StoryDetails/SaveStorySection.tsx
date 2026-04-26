"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../Button/Button";
import css from "./StoryDetails.module.css";
import { ModeModal } from "../ModeModal/ModeModal";
import {
  addStoryToFavorites,
  deleteStoryToFavorites,
  getUserProfile,
} from "@/lib/api/users/clientApi";
import toast from "react-hot-toast";
import { useAuthStore } from "@/lib/store/authStore";
import { refreshSession } from "@/lib/api/auth/clientApi";
import { AxiosError } from "axios";

interface SaveStorySectionProps {
  storyId: string;
  storyOwnerId?: string;
}

export default function SaveStorySection({
  storyId,
  storyOwnerId,
}: SaveStorySectionProps) {
  const queryClient = useQueryClient();
  const { user, isAuthenticated, setUser, clearIsAuthenticated } =
    useAuthStore();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const isOwnStory = !!storyOwnerId && user?._id === storyOwnerId;

  const isSaved = user?.savedStories?.some((item: string | { _id: string }) => {
    if (typeof item === "string") {
      return item === storyId;
    }
    return item._id === storyId;
  });

  const { mutate: toggleSave, isPending } = useMutation({
    mutationFn: async () => {
      try {
        return isSaved
          ? await deleteStoryToFavorites(storyId)
          : await addStoryToFavorites(storyId);
      } catch {
        try {
          const isSessionRefreshed = await refreshSession();

          if (!isSessionRefreshed) {
            throw new Error("Сесія завершена. Увійдіть знову.");
          }

          return isSaved
            ? await deleteStoryToFavorites(storyId)
            : await addStoryToFavorites(storyId);
        } catch {
          throw new Error("Сесія завершена. Увійдіть знову.");
        }
      }
    },

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["user-profile"] }),
        queryClient.invalidateQueries({ queryKey: ["story", storyId] }),
        queryClient.invalidateQueries({ queryKey: ["stories"] }),
      ]);

      try {
        const updatedUser = await getUserProfile();
        setUser(updatedUser);
      } catch (e) {
        console.error(e);
      }

      if (isSaved) {
        toast.success("Історію видалено зі збережених");
      } else {
        toast.success("Історію збережено");
      }
    },

    onError: (error: AxiosError) => {
      if (
        error.message === "Сесія завершена. Увійдіть знову." ||
        error.response?.status === 401
      ) {
        clearIsAuthenticated();
        setIsErrorModalOpen(true);
      } else {
        toast.error(error.message || "Помилка збереження");
      }
    },
  });

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setIsErrorModalOpen(true);
      return;
    }

    toggleSave();
  };

  if (isOwnStory) {
    return null;
  }

  return (
    <div className={css.saveStoryWrapper}>
      <h3 className={css.title}>
        {isSaved ? "Стаття збережена" : "Збережіть собі історію"}
      </h3>
      <p className={css.text}>
        {isSaved
          ? "Історія доступна у Вашому профілі у розділі збережене. Ви можете її видалити"
          : "Вона буде доступна у Вашому профілі у розділі збережене"}
      </p>

      <Button
        className={css.saveButton}
        onClick={handleSaveClick}
        isLoading={isPending}
        type="button"
      >
        {isSaved ? "Видалити" : "Зберегти"}
      </Button>

      {isErrorModalOpen && (
        <div
          className={css.backdrop}
          onClick={() => setIsErrorModalOpen(false)}
        >
          <div className={css.modal} onClick={(e) => e.stopPropagation()}>
            <ModeModal mode="save" onClose={() => setIsErrorModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
