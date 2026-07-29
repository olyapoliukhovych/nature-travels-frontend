"use client";

import { usePathname } from "next/navigation";
import css from "./ProfileTabs.module.css";
import AppLink from "../AppLink/AppLink";
import clsx from "clsx";

export default function ProfileTabs() {
  const pathname = usePathname();
  const isEditPage = pathname.startsWith("/profile/stories/edit/");
  const isSaved = pathname === "/profile/saved";

  if (isEditPage) {
    return null;
  }

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    if (pathname === path) {
      e.preventDefault();
    }
  };

  return (
    <nav
      className={clsx(
        css.profileTabsNav,
        isSaved ? css.savedActive : css.myStoriesActive,
      )}
    >
      <AppLink
        href="/profile/saved"
        replace={true}
        onClick={(e) => handleLinkClick(e, "/profile/saved")}
        className={css.profileTabsLink}
      >
        <span className={css.profileTabsText}>Збережені історії</span>
      </AppLink>
      <AppLink
        href="/profile/my-stories"
        replace={true}
        onClick={(e) => handleLinkClick(e, "/profile/my-stories")}
        className={css.profileTabsLink}
      >
        <span className={css.profileTabsText}>Мої історії</span>
      </AppLink>
    </nav>
  );
}
