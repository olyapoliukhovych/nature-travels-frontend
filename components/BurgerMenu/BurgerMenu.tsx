"use client";

import Link from "next/link";
import styles from "./BurgerMenu.module.css";
import NavLinks from "../NavLinks/NavLinks";
import AuthBar from "../AuthBar/AuthBar";
import UserBar from "../UserBar/UserBar";
import { Icon } from "../Icon/Icon";

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
          <Link
            href="/"
            className={styles.logo}
            aria-label="На головну"
            onClick={onClose}
          >
            <Icon id="icon-logo" className={styles.logoIcon} />
          </Link>

          <div className={styles.topRight}>
            {showTabletPublish && (
              <Link
                href="/stories/new"
                className={styles.publish}
                onClick={onClose}
              >
                Опублікувати статтю
              </Link>
            )}

            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Закрити меню"
            >
              <Icon id="icon-close" className={styles.closeSvg} />
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.navWrap}>
            <NavLinks isAuth={isAuth} onLinkClick={onClose} />
          </div>

          <div className={styles.mobileActions}>
            {showMobilePublish && (
              <Link
                href="/stories/new"
                className={styles.publish}
                onClick={onClose}
              >
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
