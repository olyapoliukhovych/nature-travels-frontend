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
          <p>{story.ownerId}</p>
          <span className={css.point}></span>
          <Icon id="icon-bookmark" className={css.icon} />
        </div>

        <h3 className={css.title}>{story.title}</h3>
        <div className={css.buttonWrapper}>
          <Button variant="neutral" className={css.buttonMore}>
            Переглянути статтю
          </Button>
          <Button variant="neutral" className={css.buttonFav}>
            <Icon id="icon-bookmark" className={css.buttonIcon} />
          </Button>
        </div>
      </div>
    </li>
  );
}
