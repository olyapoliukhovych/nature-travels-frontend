import css from "./AuthFooter.module.css";

export default function AuthFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={css.footer}>
      <p>© {currentYear} Природні Мандри</p>
    </footer>
  );
}
