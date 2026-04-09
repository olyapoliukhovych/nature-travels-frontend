"use client";

import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
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
}

export default function SaveStorySection({ storyId }: SaveStorySectionProps) {
  const queryClient = useQueryClient();
  const { isAuthenticated, setUser, clearIsAuthenticated } = useAuthStore();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    enabled: isAuthenticated,
    retry: false,
  });

  const isSaved = userData?.savedStories?.some(
    (item: string | { _id: string }) => {
      if (typeof item === "string") {
        return item === storyId;
      }
      return item._id === storyId;
    },
  );

  const { mutate: toggleSave, isPending } = useMutation({
    mutationFn: async () => {
      try {
        return isSaved
          ? await deleteStoryToFavorites(storyId)
          : await addStoryToFavorites(storyId);
      } catch (error) {
        try {
          await refreshSession();
          return isSaved
            ? await deleteStoryToFavorites(storyId)
            : await addStoryToFavorites(storyId);
        } catch {
          throw new Error("Сесія завершена. Увійдіть знову.");
        }
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      await queryClient.invalidateQueries({ queryKey: ["stories"] });

      try {
        const updatedUser = await getUserProfile();
        setUser(updatedUser);
      } catch (e) {
        console.error("Failed to update store user:", e);
      }

      if (isSaved) {
        toast.error("Видалено зі збережених", { id: "save" });
      } else {
        toast.success("Додано до збережених", { id: "unsave" });
      }
    },
    onError: (error: Error | AxiosError) => {
      if (
        error.message === "Сесія завершена. Увійдіть знову." ||
        (error as AxiosError).response?.status === 401
      ) {
        clearIsAuthenticated();
        setIsErrorModalOpen(true);
      } else {
        toast.error(error.message || "Помилка збереження");
      }
    },
  });

  const handleSaveClick = () => {
    if (!isAuthenticated) {
      setIsErrorModalOpen(true);
      return;
    }
    toggleSave();
  };

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
        isLoading={isPending || isUserLoading}
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
