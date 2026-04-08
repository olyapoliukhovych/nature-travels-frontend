import Image from "next/image";
import { Story } from "@/types/stories";
import css from "./StoryDetails.module.css";
import { Icon } from "../Icon/Icon";
import clsx from "clsx";
import AppLink from "../AppLink/AppLink";

import SaveStorySection from "./SaveStorySection";

interface Props {
  story: Story;
}

export default function StoryDetailsPage({ story }: Props) {
  const formattedDate = story.date
    ? new Date(story.date).toLocaleDateString("uk-UA", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className={css.container}>
      <div className={css.desctopWrapper}>
        <Image
          className={css.imageWrapper}
          src={story.img}
          width={335}
          height={223}
          alt={story.title}
        />

        <div className={css.contentWrapper}>
          <AppLink href="/stories" className={css.backLink} variant="base">
            <Icon id="icon-chevron_left" className={css.icon} />
            Всі статті
          </AppLink>

          <h1 className={css.mainTitle}>{story.title}</h1>

          <ul className={css.autorsWrapp}>
            <li className={css.text}>
              <span className={css.bold}>Автор статті</span>
              {story.ownerId?.name || "Невідомий автор"}
            </li>
            <li className={css.text}>
              <span className={css.bold}>Опубліковано</span>
              {formattedDate}
            </li>
            <li className={css.categories}>{story.categoryId.category}</li>
          </ul>
        </div>
      </div>
      <p className={clsx(css.text, css.textDesctop)}>{story.article}</p>
      <SaveStorySection storyId={story._id} />
    </div>
  );
}
