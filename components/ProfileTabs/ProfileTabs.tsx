"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./ProfileTabs.module.css";

export default function ProfileTabs() {
  const pathname = usePathname();
  const isEditPage = pathname.startsWith("/profile/edit/");

  const isActive = (path: string) => pathname === path;

  if (isEditPage) {
    return null;
  }

  return (
    <nav className={css.profileTabsNav}>
      <Link
        href="/profile/saved"
        className={`${css.profileTabsLink} ${isActive("/profile/saved") ? css.profileTabsActive : ""}`}
      >
        Збережені історії
      </Link>
      <Link
        href="/profile/my-stories"
        className={`${css.profileTabsLink} ${isActive("/profile/my-stories") ? css.profileTabsActive : ""}`}
      >
        Мої історії
      </Link>
    </nav>
  );
}
