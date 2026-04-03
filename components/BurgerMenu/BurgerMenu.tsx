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
  const showTabletPublish = viewport === "tablet" && isAuth;
  const showMobilePublish = viewport === "mobile" && isAuth;

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
            {showTabletPublish && (
              <Link href="/stories/new" className={styles.publish}>
                Опублікувати статтю
              </Link>
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
            <NavLinks isAuth={isAuth} />
          </div>

          <div className={styles.mobileActions}>
            {showMobilePublish && (
              <Link href="/stories/new" className={styles.publish}>
                Опублікувати статтю
              </Link>
            )}

            {isAuth ? <UserBar showPublish={false} /> : <AuthBar />}
          </div>
        </div>
      </div>
    </div>
  );
}
