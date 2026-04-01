"use client";

import AppLink from "../AppLink/AppLink";
import { usePathname } from "next/navigation";
import css from "./MainAuthNav.module.css";

export default function MainAuthNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={css.mainAuthNav}>
      <AppLink
        href="/register"
        className={`${css.mainAuthLink} ${isActive("/register") ? css.mainAuthActive : ""}`}
      >
        Реєстрація
      </AppLink>
      <AppLink
        href="/login"
        className={`${css.mainAuthLink} ${isActive("/login") ? css.mainAuthActive : ""}`}
      >
        Вхід
      </AppLink>
    </nav>
  );
}
