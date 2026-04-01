import Link from "next/link";
import styles from "./AuthBar.module.css";

export default function AuthBar() {
  return (
    <div className={styles.auth}>
      <Link href="/auth/login" className={styles.link}>
        Вхід
      </Link>
      <Link href="/auth/register" className={styles.primary}>
        Реєстрація
      </Link>
    </div>
  );
}
