import Image from "next/image";
import { Story } from "@/types/stories";
import css from "./StoryDetails.module.css";
import clsx from "clsx";
import SaveStorySection from "./SaveStorySection";
import BackLink from "../BackLink/BackLink";

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
          loading="eager"
        />

        <div className={css.contentWrapper}>
          <BackLink variant="stories" storyOwnerId={story.ownerId?._id} />

          <h1 className={css.mainTitle}>{story.title}</h1>

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
      <p className={clsx(css.text, css.textDesctop)}>{story.article}</p>
      <SaveStorySection storyId={story._id} storyOwnerId={story.ownerId?._id} />
    </div>
  );
}
