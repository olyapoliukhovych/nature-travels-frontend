import css from "./FooterNav.module.css";
export default function FooterNav() {
  return (
    <>
      <div className={css.footerNavWrapper}>
        <a className={css.footerNavLink} href="/">
          Головна
        </a>
        <a className={css.footerNavLink} href="/stories">
          Статті
        </a>
        <a className={css.footerNavLink} href="/travellers">
          Еко-Мандрівники
        </a>
      </div>
    </>
  );
}
