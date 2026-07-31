import clsx from "clsx";
import css from "../StoryCard/StoryCard.module.css";

export default function StoryCardSkeleton() {
  return (
    <div className={css.card}>
      <div className={clsx(css.skeletonImage, "skeletonBase")} />
      <div className={css.descriptionWrapper}>
        <div className={clsx(css.skeletonMeta, "skeletonBase")} />
        <div className={clsx(css.skeletonTitle, "skeletonBase")} />
        <div className={css.buttonWrapper}>
          <div className={clsx(css.skeletonAppLink, "skeletonBase")} />
          <div className={clsx(css.skeletonSaveBtn, "skeletonBase")} />
        </div>
      </div>
    </div>
  );
}
