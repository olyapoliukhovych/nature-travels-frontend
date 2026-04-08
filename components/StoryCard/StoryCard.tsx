"use client";

import Image from "next/image";
import css from "./StoryCard.module.css";
import AppLink from "../AppLink/AppLink";
import { Icon } from "../Icon/Icon";
import { Story } from "@/types/stories";
import {
  addStoryToFavorites,
  deleteStoryToFavorites,
  getUserProfile,
} from "@/lib/api/users/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal/Modal";
import { ModeModal } from "../ModeModal/ModeModal";
import { useAuthStore } from "@/lib/store/authStore";
import Loader from "../Loader/Loader";
import { AxiosError } from "axios";
import { refreshSession } from "@/lib/api/auth/clientApi";

interface Props {
  story: Story;
}

export default function StoryCard({ story }: Props) {
  const queryClient = useQueryClient();
  const { user, isAuthenticated, setUser, clearIsAuthenticated } =
    useAuthStore();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const isSaved = user?.savedStories?.some((item: string | { _id: string }) => {
    if (typeof item === "string") {
      return item === story._id;
    }
    return item._id === story._id;
  });

  const { mutate: toggleSave, isPending } = useMutation({
    mutationFn: async () => {
      try {
        return isSaved
          ? await deleteStoryToFavorites(story._id)
          : await addStoryToFavorites(story._id);
      } catch {
        try {
          await refreshSession();

          return isSaved
            ? await deleteStoryToFavorites(story._id)
            : await addStoryToFavorites(story._id);
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
        console.error(e);
      }

      if (isSaved) {
        toast.error("Історію видалено зі збережених", { id: "save" });
      } else {
        toast.success("Історію збережено", { id: "unsave" });
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

  return (
    <>
      <div className={css.card}>
        <div className={css.imageWrapper}>
          <Image
            className={css.picture}
            alt={story.title}
            src={story.img}
            fill
            sizes="100%"
          />
        </div>

        <div className={css.descriptionWrapper}>
          <div className={css.titleWrapper}>
            <p>{story.ownerId?.name || "Невідомий автор"}</p>
            <span className={css.point}>.</span>
            <span className={css.saveInfo}>
              {story.savedCount}
              <Icon
                id={"icon-bookmark-filled-green"}
                className={css.bookmark}
              />
            </span>
          </div>

          <h3 className={css.title}>{story.title}</h3>

          <div className={css.buttonWrapper}>
            <AppLink
              href={`/stories/${story._id}`}
              variant={"neutral"}
              className={css.appLink}
            >
              Переглянути статтю
            </AppLink>

            <button
              className={`${css.saveButton} ${isSaved ? css.isSaved : ""}`}
              onClick={handleSaveClick}
              disabled={isPending}
              type="button"
            >
              {isPending ? (
                <Loader size="sm" />
              ) : (
                <Icon
                  id={isSaved ? "icon-bookmark-filled-green" : "icon-bookmark"}
                  className={css.icon}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {isErrorModalOpen && (
        <Modal onClose={() => setIsErrorModalOpen(false)}>
          <ModeModal mode="save" onClose={() => setIsErrorModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}
