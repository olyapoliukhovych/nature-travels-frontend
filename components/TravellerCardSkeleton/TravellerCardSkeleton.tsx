import clsx from "clsx";
import css from "../TravellerCard/TravellerCard.module.css";

export default function TravellerCardSkeleton() {
  return (
    <div className={css.card}>
      <div className={css.pictureWrapper}>
        <div className={clsx(css.skeletonAvatar, "skeletonBase")} />
      </div>

      <div className={css.infoWrappper}>
        <div className={css.userInfo}>
          <div className={clsx(css.skeletonName, "skeletonBase")} />
          <div className={clsx(css.skeletonText, "skeletonBase")} />
        </div>
        <div className={clsx(css.skeletonButton, "skeletonBase")} />
      </div>
    </div>
  );
}
