"use client";

import { useEffect, useState } from "react";
import css from "./Header.module.css";
import NavLinks from "../NavLinks/NavLinks";
import AuthBar from "../AuthBar/AuthBar";
import UserBar from "../UserBar/UserBar";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import BurgerMenuBtn from "../BurgerMenuBtn/BurgerMenuBtn";
import AppLink from "../AppLink/AppLink";
import { useAuthStore } from "@/lib/store/authStore";
import clsx from "clsx";
import Logo from "../Logo/Logo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className={css.header}>
      <div className={clsx(css.container, "container")}>
        <div className={css.logoWrapper}>
          <Logo />
        </div>
        <div className={css.desktopNav}>
          <NavLinks />
        </div>

        {isAuthenticated ? (
          <>
            <div className={css.publishWrapper}>
              <AppLink
                href="/stories/new"
                variant="mantis"
                className={css.publish}
              >
                Опублікувати статтю
              </AppLink>
            </div>
            <div className={css.userBarWrapper}>
              <UserBar />
            </div>
          </>
        ) : (
          <div className={css.authBarWrapper}>
            <AuthBar />
          </div>
        )}

        <div className={css.burgerMenuBtn}>
          <BurgerMenuBtn isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>

      {isOpen && (
        <BurgerMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </header>
  );
}
