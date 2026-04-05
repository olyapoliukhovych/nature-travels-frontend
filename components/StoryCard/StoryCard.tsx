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
          <p>{story.ownerId.name}</p>
          <span className={css.point}>.</span>
          <span className={css.saveInfo}>
            {story.rate}
            <Icon id={"icon-bookmark"} className={css.bookmark} />
          </span>
        </div>

        <h3 className={css.title}>{story.title}</h3>

        <div className={css.buttonWrapper}>
          <AppLink href={"#"} variant={"neutral"} className={css.appLink}>
            Переглянути статтю
          </AppLink>

          <button className={css.saveButton}>
            <svg
              className={css.icon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="m12 18.168-4.768 2.04q-.852.367-1.617-.138-.764-.505-.764-1.428V4.429q0-.693.506-1.2a1.63 1.63 0 0 1 1.197-.51h10.892q.693 0 1.201.51.51.507.509 1.2v14.213q0 .923-.768 1.428t-1.62.138zm0-1.822 5.446 2.296V4.429H6.554v14.213zm0-11.917H6.554h10.892z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
