import Link from "next/link";
import styles from "./NavLinks.module.css";

type Props = {
  isAuth: boolean;
  onLinkClick?: () => void;
};

export default function NavLinks({ isAuth, onLinkClick }: Props) {
  return (
    <nav className={styles.nav} aria-label="Основна навігація">
      <Link href="/" className={styles.link} onClick={onLinkClick}>
        Головна
      </Link>

      <Link href="/stories" className={styles.link} onClick={onLinkClick}>
        Статті
      </Link>

      <Link href="/travellers" className={styles.link} onClick={onLinkClick}>
        Еко-Мандрівники
      </Link>

      {isAuth && (
        <Link href="/profile" className={styles.link} onClick={onLinkClick}>
          Мій профіль
        </Link>
      )}
    </nav>
  );
}
