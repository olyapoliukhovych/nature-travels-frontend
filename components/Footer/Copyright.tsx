import AnimatedText from "../AnimatedText/AnimatedText";
import css from "./Copyright.module.css";

export default function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <AnimatedText tag="p" className={css.copyrightParagraph}>
      {`© ${currentYear} Природні Мандри. Усі права захищені.`}
    </AnimatedText>
  );
}
