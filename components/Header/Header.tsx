"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

import NavLinks from "../NavLinks/NavLinks";
import AuthBar from "../AuthBar/AuthBar";
import UserBar from "../UserBar/UserBar";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import BurgerMenuBtn from "../BurgerMenuBtn/BurgerMenuBtn";

type Viewport = "mobile" | "tablet" | "desktop";

function getViewport(): Viewport {
  if (typeof window === "undefined") return "desktop";

  const width = window.innerWidth;

  if (width >= 1024) return "desktop";
  if (width >= 768) return "tablet";
  return "mobile";
}

export default function Header() {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [isOpen, setIsOpen] = useState(false);

  const isAuth = false; // Оль, це заглушка для перевірки, я подумаю як зробити все правильно та зміню

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
        <Link href="/" className={styles.logo} aria-label="На головну">
          <svg
            className={styles.logoIcon}
            width="108"
            height="32"
            aria-hidden="true"
          >
            <use href="/sprite.svg#icon-logo" />
          </svg>
        </Link>

        {viewport === "desktop" && (
          <div className={styles.desktop}>
            <NavLinks />
            {isAuth ? <UserBar /> : <AuthBar />}
          </div>
        )}

        {viewport === "tablet" && (
          <div className={styles.tabletActions}>
            {isAuth ? <UserBar /> : <AuthBar />}
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
    </header>
  );
}
