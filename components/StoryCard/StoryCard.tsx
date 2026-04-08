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
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal/Modal";
import { ModeModal } from "../ModeModal/ModeModal";

interface Props {
  story: Story;
}

export default function StoryCard({ story }: Props) {
  const queryClient = useQueryClient();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    retry: false,
  });

  const isSaved = user?.savedStories?.some((item: string | { _id: string }) => {
    if (typeof item === "string") {
      return item === story._id;
    }
    return item._id === story._id;
  });

  const { mutate: toggleSave, isPending } = useMutation({
    mutationFn: () =>
      isSaved
        ? deleteStoryToFavorites(story._id)
        : addStoryToFavorites(story._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success(
        isSaved ? "Видалено зі збережених" : "Додано до збережених",
      );
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Помилка запиту", {
        id: "save-error",
      });
    },
  });

  const handleSaveClick = () => {
    if (!user && !isUserLoading) {
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
                id={"icon-bookmark-filled-black"}
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
              <Icon
                id={isSaved ? "icon-bookmark-filled" : "icon-bookmark"}
                className={css.icon}
              />
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
