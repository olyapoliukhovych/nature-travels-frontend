"use client";

import Link from "next/link";
import styles from "./BurgerMenu.module.css";
import NavLinks from "../NavLinks/NavLinks";
import AuthBar from "../AuthBar/AuthBar";
import UserBar from "../UserBar/UserBar";
import { Icon } from "../Icon/Icon";

type Props = {
  viewport: "mobile" | "tablet";
  isAuth: boolean;
  onClose: () => void;
};

export default function BurgerMenu({ viewport, isAuth, onClose }: Props) {
  return (
    <div className={styles.menu} id="mobile-menu">
      <div className={styles.panel}>
        <div className={styles.top}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="На головну сторінку"
          >
            <Icon id="icon-logo" className={styles.logoIcon} />
          </Link>

          <div className={styles.topRight}>
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
            {isAuth ? (
              <UserBar
                showPublish={viewport === "mobile"}
                // user={user}
              />
            ) : viewport === "mobile" ? (
              <AuthBar variant="menu" onLinkClick={onClose} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
