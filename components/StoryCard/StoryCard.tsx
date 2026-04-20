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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal/Modal";
import { ModeModal } from "../ModeModal/ModeModal";
import {
  BurstAnimation,
  CircleAnimation,
} from "../SaveAnimation/SaveAnimation";
import NumberFlow from "@number-flow/react";
import { useAuthStore } from "@/lib/store/authStore";
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [localSavedCount, setLocalSavedCount] = useState(story.savedCount);

  useEffect(() => {
    setLocalSavedCount(story.savedCount);
  }, [story.savedCount]);

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
      setLocalSavedCount((prev) => (isSaved ? prev - 1 : prev + 1));

      const change = isSaved ? -1 : 1;

      queryClient.setQueriesData<{ stories: Story[] }>(
        { queryKey: ["profile-stories"] },
        (old) => {
          if (!old || !old.stories) return old;

          return {
            ...old,
            stories: old.stories.map((s: Story) =>
              s._id === story._id
                ? { ...s, savedCount: s.savedCount + change }
                : s,
            ),
          };
        },
      );

      const delay = !isSaved ? 800 : 0;

      setTimeout(async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["user-profile"] }),
          queryClient.invalidateQueries({ queryKey: ["profile-stories"] }),
          queryClient.invalidateQueries({
            queryKey: ["stories"],
            refetchType: "active",
          }),
          queryClient.invalidateQueries({
            queryKey: ["stories-popular"],
            refetchType: "active",
          }),
          queryClient.invalidateQueries({
            queryKey: ["stories-related"],
            refetchType: "active",
          }),
          queryClient.invalidateQueries({
            queryKey: ["stories-public"],
            refetchType: "active",
          }),
        ]);

        try {
          const updatedUser = await getUserProfile();
          setUser(updatedUser);
        } catch (e) {
          console.error(e);
        }

        const message = isSaved
          ? "Історію видалено зі збережених"
          : "Історію збережено";

        toast.success(message);
      }, delay);
    },

    onError: (error: AxiosError) => {
      setLocalSavedCount(story.savedCount);
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

    if (!isSaved) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1200);
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
              <NumberFlow
                value={localSavedCount}
                transformTiming={{
                  duration: 500,
                  easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
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
              style={{ position: "relative" }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "24px",
                  height: "24px",
                }}
              >
                {isAnimating && <CircleAnimation />}
                {isAnimating && <BurstAnimation />}

                <Icon
                  id={isSaved ? "icon-bookmark-filled-green" : "icon-bookmark"}
                  className={css.icon}
                  style={{ position: "relative", zIndex: 12 }}
                />
              </div>
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
