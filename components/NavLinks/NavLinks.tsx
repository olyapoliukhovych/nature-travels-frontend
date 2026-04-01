import Link from "next/link";
import styles from "./NavLinks.module.css";

export default function NavLinks() {
  return (
    <nav className={styles.nav} aria-label="Основна навігація">
      <Link href="/" className={styles.link}>
        Головна
      </Link>
      <Link href="/stories" className={styles.link}>
        Статті
      </Link>
      <Link href="/travellers" className={styles.link}>
        Еко-Мандрівники
      </Link>
      <Link href="/profile" className={styles.link}>
        Мій профіль
      </Link>
    </nav>
  );
}
