"use client";

import { usePathname } from "next/navigation";
import css from "./MainAuthNav.module.css";
import AppLink from "../AppLink/AppLink";

export default function MainAuthNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={css.mainAuthNav}>
      <AppLink
        href="/auth/register"
        replace={true}
        className={`${css.mainAuthLink} ${isActive("/auth/register") ? css.mainAuthActive : ""}`}
      >
        Реєстрація
      </AppLink>
      <AppLink
        href="/auth/login"
        replace={true}
        className={`${css.mainAuthLink} ${isActive("/auth/login") ? css.mainAuthActive : ""}`}
      >
        Вхід
      </AppLink>
    </nav>
  );
}
