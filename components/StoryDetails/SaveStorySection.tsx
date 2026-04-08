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

interface SaveStorySectionProps {
  storyId: string;
}

export default function SaveStorySection({ storyId }: SaveStorySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    retry: false,
  });

  const isSaved = user?.savedStories?.some((item: string | { _id: string }) =>
    typeof item === "string" ? item === storyId : item._id === storyId,
  );

  const { mutate: toggleSave, isPending } = useMutation({
    mutationFn: () =>
      isSaved ? deleteStoryToFavorites(storyId) : addStoryToFavorites(storyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });

      toast.success(
        isSaved ? "Видалено зі збережених" : "Додано до збережених",
        { id: "save-detail-status" },
      );
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Помилка запиту");
    },
  });

  const handleSaveClick = () => {
    if (!user && !isUserLoading) {
      setIsModalOpen(true);
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
        isLoading={isPending}
        type="button"
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
