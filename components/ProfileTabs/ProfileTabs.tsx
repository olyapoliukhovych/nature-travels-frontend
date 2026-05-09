"use client";

import { usePathname } from "next/navigation";
import css from "./ProfileTabs.module.css";
import AppLink from "../AppLink/AppLink";

export default function ProfileTabs() {
  const pathname = usePathname();
  const isEditPage = pathname.startsWith("/profile/stories/edit/");

  const isActive = (path: string) => pathname === path;

  if (isEditPage) {
    return null;
  }

  return (
    <nav className={css.profileTabsNav}>
      <AppLink
        href="/profile/saved"
        replace={true}
        className={`${css.profileTabsLink} ${isActive("/profile/saved") ? css.profileTabsActive : ""}`}
      >
        Збережені історії
      </AppLink>
      <AppLink
        href="/profile/my-stories"
        replace={true}
        className={`${css.profileTabsLink} ${isActive("/profile/my-stories") ? css.profileTabsActive : ""}`}
      >
        Мої історії
      </AppLink>
    </nav>
  );
}
