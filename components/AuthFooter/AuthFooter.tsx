import AnimatedText from "../AnimatedText/AnimatedText";
import css from "./AuthFooter.module.css";

export default function AuthFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={css.footer}>
      <AnimatedText tag="p">{`© ${currentYear} Природні Мандри`}</AnimatedText>
    </footer>
  );
}
