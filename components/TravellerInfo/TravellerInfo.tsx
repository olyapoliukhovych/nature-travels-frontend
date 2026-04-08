import Image from "next/image";

import css from "./TravellerInfo.module.css";
import { UserPrivate } from "@/types/user";

interface Props {
  user: UserPrivate | null;
}

export default function TravellerInfo({ user }: Props) {
  if (!user) return <div className={css.loader}>Завантаження профілю...</div>;

  return (
    <div className={css.travellerInfoWrapper}>
      <div className={css.avatarContainer}>
        <Image
          src={user.avatarUrl}
          width={145}
          height={145}
          alt={user.name}
          className={css.travellerInfoAvatar}
        />
      </div>

      <div className={css.travellerInfoContentWrapper}>
        <h1 className={css.travellerInfoTitle}>{user.name}</h1>
        <p className={css.travellerInfoParagraph}>
          Статей: {user.totalUserStories}
        </p>
      </div>
    </div>
  );
}
