"use client";

import Image from "next/image";
import css from "./TravellerInfo.module.css";
import { UserPrivate, UserPublic } from "@/types/user";

interface Props {
  user: UserPublic | UserPrivate;
}

export default function TravellerInfo({ user }: Props) {
  if (!user) return null;

  return (
    <div className={css.travellerInfoWrapper}>
      <div className={css.avatarContainer}>
        <Image
          src={user.avatarUrl}
          width={145}
          height={145}
          alt={user.name}
          className={css.travellerInfoAvatar}
          loading="eager"
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
