import Link from "next/link";
import styles from "./NavLinks.module.css";

type Props = {
  isAuth: boolean;
};

export default function NavLinks({ isAuth }: Props) {
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

      {isAuth && (
        <Link href="/profile" className={styles.link}>
          Мій профіль
        </Link>
      )}
    </nav>
  );
}
