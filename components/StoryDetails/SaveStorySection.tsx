"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import css from "./StoryDetails.module.css";
import { ModeModal } from "../ModeModal/ModeModal";
import { useAuthStore } from "@/lib/store/authStore";
import { addStoryToFavorites } from "@/lib/api/users/clientApi";

interface SaveStorySectionProps {
  storyId: string;
}

export default function SaveStorySection({ storyId }: SaveStorySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuthStore((state) => state.user);

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

    const isAlreadySaved = user.savedStories?.includes(storyId);

    if (isAlreadySaved) {
      toast.error("Історію вже збережено");
      return;
    }

    if (isAlreadySaved) {
      toast.error("Історію вже збережено");
      return;
    }

    try {
      setIsLoading(true);
      await addStoryToFavorites(storyId);
      toast.success("Історію успішно збережено");
    } catch (error) {
      toast.error("Не вдалося зберегти історію");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.saveStoryWrapper}>
      <h3 className={css.title}>Збережіть собі історію</h3>
      <p className={css.text}>
        Вона буде доступна у вашому профілі у розділі збережене
      </p>
      <Button
        className={css.saveButton}
        onClick={handleSave}
        isLoading={isLoading}
      >
        Зберегти
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
