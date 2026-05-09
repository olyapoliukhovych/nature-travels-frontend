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
            sizes="(min-width: 1440px) 755px, (min-width: 768px) 704px, 335px"
            fill
            priority
          />
        </div>

        <div className={css.contentWrapper}>
          <BackLink variant="stories" storyOwnerId={story.ownerId?._id} />

          <AnimatedText className={css.mainTitle}>{story.title}</AnimatedText>

          <ul className={css.autorsWrapp}>
            <li className={css.text}>
              <AnimatedText tag="span" className={css.bold}>
                Автор статті
              </AnimatedText>
              <AnimatedText tag="span">
                {story.ownerId?.name ?? "Невідомий автор"}
              </AnimatedText>
            </li>
            <li className={css.text}>
              <AnimatedText tag="span" className={css.bold}>
                Опубліковано
              </AnimatedText>
              <AnimatedText tag="span">{formattedDate}</AnimatedText>
            </li>
            <li className={css.categories}>
              <AnimatedText tag="span">
                {story.categoryId.category}
              </AnimatedText>
            </li>
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
