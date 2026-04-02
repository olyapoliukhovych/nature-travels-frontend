"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./MainAuthNav.module.css";

export default function MainAuthNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={css.mainAuthNav}>
      <Link
        href="/auth/register"
        replace={true}
        className={`${css.mainAuthLink} ${isActive("/auth/register") ? css.mainAuthActive : ""}`}
      >
        Реєстрація
      </Link>
      <Link
        href="/auth/login"
        replace={true}
        className={`${css.mainAuthLink} ${isActive("/auth/login") ? css.mainAuthActive : ""}`}
      >
        Вхід
      </Link>
    </nav>
  );
}
