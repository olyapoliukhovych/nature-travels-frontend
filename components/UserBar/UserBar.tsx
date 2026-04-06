"use client";

import Link from "next/link";
import styles from "./UserBar.module.css";

type Props = {
  showPublish?: boolean;
};

export default function UserBar({ showPublish = true }: Props) {
  return (
    <div className={styles.user}>
      {showPublish && (
        <Link href="/stories/new" className={styles.publish}>
          Опублікувати статтю
        </Link>
      )}

      <div className={styles.bottom}>
        <div className={styles.avatar} aria-hidden="true">
          <svg width="32" height="32" aria-hidden="true">
            <use href="/sprite.svg#icon-user" />
          </svg>
        </div>

        <span className={styles.divider} />

        <Link href="/profile" className={styles.name}>
          Ім&apos;я
        </Link>

        <Link href="/auth/login" className={styles.logout} aria-label="Вийти">
          <svg width="24" height="24" aria-hidden="true">
            <use href="/sprite.svg#icon-logout" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
