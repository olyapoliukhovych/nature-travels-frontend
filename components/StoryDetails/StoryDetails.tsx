import Image from "next/image";
import { Story } from "@/types/stories";
import css from "./StoryDetails.module.css";
import clsx from "clsx";
import SaveStorySection from "./SaveStorySection";
import BackLink from "../BackLink/BackLink";
import AnimatedText from "../AnimatedText/AnimatedText";

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
        <div className={css.imageWrapper}>
          <Image
            className={css.image}
            src={story.img}
            alt={story.title}
            fill
            priority
          />
        </div>

        <div className={css.contentWrapper}>
          <BackLink variant="stories" storyOwnerId={story.ownerId?._id} />

          <AnimatedText className={css.mainTitle}>{story.title}</AnimatedText>

          <ul className={css.autorsWrapp}>
            <li className={css.text}>
              <span className={css.bold}>Автор статті</span>
              {story.ownerId?.name ?? "Невідомий автор"}
            </li>
            <li className={css.text}>
              <span className={css.bold}>Опубліковано</span>
              {formattedDate}
            </li>
            <li className={css.categories}>{story.categoryId.category}</li>
          </ul>
        </div>
      </div>
      <AnimatedText tag="p" className={clsx(css.text, css.textDesctop)}>
        {story.article}
      </AnimatedText>
      <SaveStorySection storyId={story._id} storyOwnerId={story.ownerId?._id} />
    </div>
  );
}
