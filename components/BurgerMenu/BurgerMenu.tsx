"use client";

import Link from "next/link";
import styles from "./BurgerMenu.module.css";

import NavLinks from "../NavLinks/NavLinks";
import AuthBar from "../AuthBar/AuthBar";
import UserBar from "../UserBar/UserBar";

type Viewport = "mobile" | "tablet" | "desktop";

type Props = {
  viewport: Viewport;
  isAuth: boolean;
  onClose: () => void;
};

export default function BurgerMenu({ viewport, isAuth, onClose }: Props) {
  return (
    <div
      className={styles.menu}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.panel}>
        <div className={styles.top}>
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

          <div className={styles.topRight}>
            {viewport === "tablet" && (
              <div className={styles.tabletActions}>
                {isAuth ? <UserBar /> : <AuthBar />}
              </div>
            )}

            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Закрити меню"
            >
              <svg width="32" height="32" aria-hidden="true">
                <use href="/sprite.svg#icon-close" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.navWrap}>
            <NavLinks />
          </div>

          {viewport === "mobile" && (
            <div className={styles.mobileActions}>
              {isAuth ? <UserBar /> : <AuthBar />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
