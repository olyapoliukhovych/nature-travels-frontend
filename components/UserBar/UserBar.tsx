"use client";

import Link from "next/link";
import css from "./UserBar.module.css";
import Image from "next/image";
import { Icon } from "../Icon/Icon";
import { useAuthStore } from "@/lib/store/authStore";
import { ThemeToggleButton } from "../ThemeToggleButton/ThemeToggleButton";
import { AnimationToggleButton } from "../AnimationToggleButton/AnimationToggleButton";

interface Props {
  onLogoutClick?: () => void;
}

export default function UserBar({ onLogoutClick }: Props) {
  const user = useAuthStore((s) => s.user);
  return (
    <div className={css.userBar}>
      <Link href="/profile/my-stories" className={css.profile}>
        <div className={css.avatar}>
          <Image
            src={user?.avatarUrl || "/default-avatar.jpg"}
            alt={user?.name || "default avatar"}
            width={32}
            height={32}
            className={css.avatarImg}
            priority
          />
        </div>

        <span className={css.name}>{user?.name || "Ім'я"}</span>
      </Link>

      <span className={css.divider} />

      <AnimationToggleButton />

      <span className={css.divider} />

      <ThemeToggleButton />

      <span className={css.divider} />

      <button className={css.logout} onClick={onLogoutClick} aria-label="Вийти">
        <Icon id="icon-logout" className={css.logoutSvg} />
      </button>
    </div>
  );
}
