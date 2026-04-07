"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import NavLinks from "../NavLinks/NavLinks";
import AuthBar from "../AuthBar/AuthBar";
import UserBar from "../UserBar/UserBar";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import BurgerMenuBtn from "../BurgerMenuBtn/BurgerMenuBtn";
import { Icon } from "../Icon/Icon";
import AppLink from "../AppLink/AppLink";
import { useAuthStore } from "@/lib/store/authStore";

type Viewport = "mobile" | "tablet" | "desktop";

function getViewport(): Viewport {
  if (typeof window === "undefined") return "desktop";

  const width = window.innerWidth;

  if (width >= 1440) return "desktop";
  if (width >= 768) return "tablet";
  return "mobile";
}

export default function Header() {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const isAuth = isAuthenticated;

  useEffect(() => {
    const updateViewport = () => setViewport(getViewport());

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (viewport === "desktop" && isOpen) {
      setIsOpen(false);
    }
  }, [viewport, isOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" aria-label="На головну сторінку">
          <Icon id="icon-logo" className={styles.logoIcon} />
        </Link>

        {viewport === "desktop" && (
          <div className={styles.desktop}>
            <NavLinks isAuth={isAuth} />
            {isAuth ? <UserBar /> : <AuthBar variant="header" />}
          </div>
        )}
        {viewport === "tablet" && (
          <div className={styles.tabletActions}>
            {!isAuth && !isOpen && <AuthBar variant="header" />}

            {isAuth && (
              <AppLink href="/stories/new" className={styles.publish}>
                Опублікувати статтю
              </AppLink>
            )}
            <BurgerMenuBtn isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        )}
        {viewport === "mobile" && (
          <div className={styles.mobileActions}>
            <BurgerMenuBtn isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        )}
      </div>

      {isOpen && (
        <BurgerMenu
          viewport={viewport}
          isAuth={isAuth}
          onClose={() => setIsOpen(false)}
        />
      )}
      {/* {isOpen && viewport !== "desktop" && (
        <BurgerMenu
          viewport={viewport}
          isAuth={isAuth}
          onClose={() => setIsOpen(false)}
        />
      )} */}
    </header>
  );
}
