import { Story } from "@/types/types";
import Image from "next/image";
import css from "./StoryCard.module.css";
import { Icon } from "../Icon/Icon";
import Button from "../Button/Button";

interface Props {
  story: Story;
}

export default function StoryCard({ story }: Props) {
  return (
    <li className={css.card}>
      <Image alt={story.title} src={story.img} width={340} height={340} />
      <div className={css.content}>
        <div className={css.titleWrapper}>
          <p className={css.ownerName}>{story.ownerId.name}</p>
          <span className={css.point} aria-hidden="true"></span>
          <span className={css.favoritesCount}>
            {story.favoritesCount}
            <Icon id="icon-bookmark" className={css.icon} aria-hidden="true" />
          </span>
        </div>

        <h3 className={css.title}>{story.title}</h3>
        <div className={css.buttonWrapper}>
          <Button variant="neutral" className={css.buttonMore}>
            Переглянути статтю
          </Button>
          <Button
            variant="neutral"
            className={css.buttonFav}
            aria-label="Додати статтю до закладок"
          >
            <Icon id="icon-bookmark" className={css.buttonIcon} />
          </Button>
        </div>
      </div>
    </li>
  );
}
