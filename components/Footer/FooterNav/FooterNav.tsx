import css from "./FooterNav.module.css";
import AppLink from "@/components/AppLink/AppLink";
export default function FooterNav() {
  return (
    <nav className={css.footerNavWrapper}>
      <AppLink className={css.footerNavLink} href="/">
        Головна
      </AppLink>
      <AppLink className={css.footerNavLink} href="/stories">
        Статті
      </AppLink>
      <AppLink className={css.footerNavLink} href="/travellers">
        Еко-Мандрівники
      </AppLink>
    </nav>
  );
}
