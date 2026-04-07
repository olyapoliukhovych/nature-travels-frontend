"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../Button/Button";
import css from "./StoryDetails.module.css";
import { ModeModal } from "../ModeModal/ModeModal";
import { useAuthStore } from "@/lib/store/authStore";
import {
  addStoryToFavorites,
  deleteStoryToFavorites,
  getUserProfile,
} from "@/lib/api/users/clientApi";

interface SaveStorySectionProps {
  storyId: string;
}

export default function SaveStorySection({ storyId }: SaveStorySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();
  const isSaved = user?.savedStories?.includes(storyId) ?? false;

  const refreshUser = async () => {
    const freshUser = await getUserProfile();
    setUser(freshUser);
  };

  const invalidate = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["story", storyId] }),
      queryClient.invalidateQueries({ queryKey: ["popular-stories"] }),
      queryClient.invalidateQueries({ queryKey: ["saved-stories"] }),
    ]);
  };

  const saveStoryMutation = useMutation({
    mutationFn: (storyId: string) => addStoryToFavorites(storyId),
    onSuccess: async () => {
      await Promise.all([invalidate(), refreshUser()]);
      toast.success("Історію успішно збережено");
    },
    onError: (error) => {
      toast.error("Не вдалося зберегти історію");
      console.error(error);
    },
  });

  const removeMutation = useMutation({
    mutationFn: (storyId: string) => deleteStoryToFavorites(storyId),
    onSuccess: async () => {
      await Promise.all([invalidate(), refreshUser()]);
      toast.success("Історію видалено зі збережених");
    },
    onError: (error) => {
      toast.error("Не вдалося видалити історію");
      console.error(error);
    },
  });

  const handleSave = async () => {
    const userId = user?._id;

    if (!userId) {
      setIsModalOpen(true);
      return;
    }

    if (!storyId) {
      toast.error("Не вдалося знайти історію");
      return;
    }

    if (isSaved) {
      await removeMutation.mutateAsync(storyId);
      return;
    }

    await saveStoryMutation.mutateAsync(storyId);
  };

  const isPending = saveStoryMutation.isPending || removeMutation.isPending;

  return (
    <div className={css.saveStoryWrapper}>
      <h3 className={css.title}>
        {isSaved ? "Історію збережено" : "Збережіть собі історію"}
      </h3>
      <p className={css.text}>
        {isSaved
          ? "Історія доступна у Вашому профілі у розділі збережене, Ви можете її видалити"
          : "Вона буде доступна у Вашому профілі у розділі збережене"}
      </p>

      <Button
        className={css.saveButton}
        onClick={handleSave}
        isLoading={isPending}
      >
        {isSaved ? "Видалити" : "Зберегти"}
      </Button>

      {isModalOpen && (
        <div className={css.backdrop} onClick={() => setIsModalOpen(false)}>
          <div className={css.modal} onClick={(e) => e.stopPropagation()}>
            <ModeModal mode="save" onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
