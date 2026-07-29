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
import { getUserFriendlyErrorMessage } from "@/lib/utils/getErrorMessage";
import { useAuthStore } from "@/lib/store/authStore";
import { refreshSession } from "@/lib/api/auth/clientApi";
import { AxiosError } from "axios";
import Modal from "../Modal/Modal";

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
        } catch (err) {
          const axiosErr = err as AxiosError;
          if (axiosErr?.response?.status === 401) {
            throw new Error("Сесія завершена. Увійдіть знову.");
          }
          throw new Error("Помилка мережі. Спробуйте ще раз.");
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
        toast.success("Історію додано до збережених");
      }
    },

    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        clearIsAuthenticated();
        setIsErrorModalOpen(true);
      } else {
        toast.error(getUserFriendlyErrorMessage(error));
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
        <Modal onClose={() => setIsErrorModalOpen(false)}>
          <ModeModal mode="save" onClose={() => setIsErrorModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
