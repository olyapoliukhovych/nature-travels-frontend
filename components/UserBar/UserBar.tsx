import Link from "next/link";
import styles from "./UserBar.module.css";

export default function UserBar() {
  return (
    <div className={styles.user}>
      <Link href="/stories/new" className={styles.publish}>
        Опублікувати статтю
      </Link>

      <div className={styles.bottom}>
        <Link href="/profile" className={styles.name}>
          Ім&apos;я
        </Link>

        <Link href="/auth/login" className={styles.logout} aria-label="Вийти">
          <svg width="20" height="20" aria-hidden="true">
            <use href="/sprite.svg#icon-logout" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
