import Link from "next/link";
import styles from "./AuthBar.module.css";

type Props = {
  variant?: "header" | "menu";
  onLinkClick?: () => void;
};

export default function AuthBar({ variant = "header", onLinkClick }: Props) {
  return (
    <div className={`${styles.auth} ${variant === "menu" ? styles.menu : ""}`}>
      <Link href="/auth/login" className={styles.link} onClick={onLinkClick}>
        Вхід
      </Link>
      <Link
        href="/auth/register"
        className={styles.primary}
        onClick={onLinkClick}
      >
        Реєстрація
      </Link>
    </div>
  );
}
