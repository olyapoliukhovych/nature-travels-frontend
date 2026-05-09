import LoginForm from "@/components/LoginForm/LoginForm";
import css from "./page.module.css";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вхід",
  description:
    "Увійдіть у свій акаунт Природні Мандри, щоб продовжити свою подорож та ділитися еко-історіями.",
};

export default function LoginPage() {
  return (
    <>
      <AnimatedText align="center">Вхід</AnimatedText>
      <AnimatedText tag="p" align="center" className={css.loginFormParagraph}>
        Вітаємо знову у спільноті мандрівників!
      </AnimatedText>
      <LoginForm />
    </>
  );
}
