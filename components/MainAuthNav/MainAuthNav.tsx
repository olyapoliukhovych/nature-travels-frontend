"use client";

import { usePathname } from "next/navigation";
import css from "./MainAuthNav.module.css";
import AppLink from "../AppLink/AppLink";
import clsx from "clsx";

export default function MainAuthNav() {
  const pathname = usePathname();
  const isRegister = pathname === "/auth/register";

  return (
    <nav
      className={clsx(
        css.mainAuthNav,
        isRegister ? css.registerActive : css.loginActive,
      )}
    >
      <AppLink
        href="/auth/register"
        replace={true}
        className={css.mainAuthLink}
      >
        Реєстрація
      </AppLink>
      <AppLink href="/auth/login" replace={true} className={css.mainAuthLink}>
        Вхід
      </AppLink>
    </nav>
  );
}
