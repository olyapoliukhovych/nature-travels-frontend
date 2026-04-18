"use client";

import Image from "next/image";
import css from "./TravellerInfo.module.css";
import { useQuery } from "@tanstack/react-query";
import { getUserByIdPublic } from "@/lib/api/users/clientApi";

interface Props {
  userId: string;
}

export default function TravellerInfo({ userId }: Props) {
  const { data: user } = useQuery({
    queryKey: ["user-public", userId],
    queryFn: () => getUserByIdPublic(userId),
    refetchOnMount: false,
  });

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
          priority
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
