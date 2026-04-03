import Link from "next/link";
import css from "./FooterNav.module.css";
export default function FooterNav() {
  return (
    <nav className={css.footerNavWrapper}>
      <Link className={css.footerNavLink} href="/">
        Головна
      </Link>
      <Link className={css.footerNavLink} href="/stories">
        Статті
      </Link>
      <Link className={css.footerNavLink} href="/travellers">
        Еко-Мандрівники
      </Link>
    </nav>
  );
}
