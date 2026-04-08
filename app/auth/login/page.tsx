import LoginForm from "@/components/LoginForm/LoginForm";
import css from "./page.module.css";
import PageTitle from "@/components/PageTitle/PageTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вхід",
  description:
    "Увійдіть у свій акаунт Природні Мандри, щоб продовжити свою подорож та ділитися еко-історіями.",
};

export default function LoginPage() {
  return (
    <>
      <PageTitle align="center">Вхід</PageTitle>
      <p className={css.loginFormParagraph}>
        Вітаємо знову у спільноті мандрівників!
      </p>
      <LoginForm />
    </>
  );
}
