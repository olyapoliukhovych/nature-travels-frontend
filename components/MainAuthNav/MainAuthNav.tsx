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
        href="/register"
        className={`${css.mainAuthLink} ${isActive("/register") ? css.mainAuthActive : ""}`}
      >
        Реєстрація
      </Link>
      <Link
        href="/login"
        className={`${css.mainAuthLink} ${isActive("/login") ? css.mainAuthActive : ""}`}
      >
        Вхід
      </Link>
    </nav>
  );
}
