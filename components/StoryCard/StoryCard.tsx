import Image from "next/image";
import css from "./StoryCard.module.css";
import AppLink from "../AppLink/AppLink";
import { Icon } from "../Icon/Icon";
import { Story } from "@/types/stories";

interface Props {
  story: Story;
}

export default function StoryCard({ story }: Props) {
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
            {story.rate}
            <Icon id={"icon-bookmark"} className={css.bookmark} />
          </span>
        </div>

        <h3 className={css.title}>{story.title}</h3>

        <div className={css.buttonWrapper}>
          <AppLink
            href={"/stories/${story._id}"}
            variant={"neutral"}
            className={css.appLink}
          >
            Переглянути статтю
          </AppLink>

          <button className={css.saveButton}>
            <Icon id={"icon-bookmark"} className={css.icon} />
          </button>
        </div>
      </div>
    </div>
  );
}
