"use client";

import Image from "next/image";
import css from "./TravellerInfo.module.css";
import { UserPrivate, UserPublic } from "@/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../Icon/Icon";
import { useAuthStore } from "@/lib/store/authStore";
import AnimatedText from "../AnimatedText/AnimatedText";

interface Props {
  user: UserPublic | UserPrivate;
}

export default function TravellerInfo({ user: propUser }: Props) {
  const authUser = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const isPrivateProfilePage =
    pathname === "/profile/my-stories" || pathname === "/profile/saved";
  const isOwner = authUser?._id === propUser._id && isPrivateProfilePage;
  const user = isOwner && authUser ? authUser : propUser;

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
          <AnimatedText className={css.travellerInfoTitle}>
            {user.name}
          </AnimatedText>
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
        <AnimatedText tag="p" className={css.travellerInfoParagraph}>
          {`Статей: ${user.totalUserStories}`}
        </AnimatedText>
      </div>
    </div>
  );
}
