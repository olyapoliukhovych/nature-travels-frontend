import css from "./Copyright.module.css";

export default function Copyright() {
  const currentYear = new Date().getFullYear();
  return (
    <p className={css.copyrightParagraph}>
      © {currentYear} Природні Мандри. Усі права захищені.
    </p>
  );
}
