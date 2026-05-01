"use client";

import Image from "next/image";
import css from "./TravellerInfo.module.css";
import { UserPrivate, UserPublic } from "@/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../Icon/Icon";
import { useAuthStore } from "@/lib/store/authStore";

interface Props {
  user: UserPublic | UserPrivate;
}

export default function TravellerInfo({ user: propUser }: Props) {
  const authUser = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const isPrivateProfilePage =
    pathname === "/profile/my-stories" || pathname === "/profile/saved";
  const isOwner = authUser?._id === propUser._id && isPrivateProfilePage;
  const user = propUser;

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
        <div className={css.titleWrapper}>
          <h1 className={css.travellerInfoTitle}>{user.name}</h1>
          {isOwner && (
            <Link
              href={"/profile/settings"}
              className={css.editLink}
              title="Редагувати профіль"
            >
              <Icon id="icon-edit" className={css.editIcon} />
            </Link>
          )}
        </div>
        <p className={css.travellerInfoParagraph}>
          Статей: {user.totalUserStories}
        </p>
      </div>
    </div>
  );
}
