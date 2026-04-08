import Image from "next/image";
import css from "./StoryCard.module.css";
import AppLink from "../AppLink/AppLink";
import { Icon } from "../Icon/Icon";
import { Story } from "@/types/stories";
import toast from "react-hot-toast";
import {
  addStoryToFavorites,
  deleteStoryToFavorites,
  getUserProfile,
} from "@/lib/api/users/clientApi";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

interface Props {
  story: Story;
}

export default function StoryCard({ story }: Props) {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
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
      queryClient.invalidateQueries({ queryKey: ["profile-stories"] });
    },
    onError: () => {
      toast.error("Щось пішло не так...");
    },
  });

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Будь ласка, спочатку увійдіть в акаунт", {
        icon: "🔒",
        style: {
          borderRadius: "10px",
          background: "--color-scheme-1-background",
          color: "--color-scheme-2-text",
        },
      });
      return;
    }

    toggleSave();
  };
  return (
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
            <Icon id={"icon-bookmark"} className={css.bookmark} />
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
            className={css.saveButton}
            onClick={handleSaveClick}
            disabled={isPending}
            style={{
              backgroundColor: isSaved ? "var(--color-mantis-dark)" : "",
            }}
          >
            <Icon
              id={"icon-bookmark"}
              className={css.icon}
              style={{ fill: isSaved ? "white" : "" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
