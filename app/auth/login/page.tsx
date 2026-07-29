import LoginForm from "@/components/LoginForm/LoginForm";
import css from "../page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вхід",
  description:
    "Увійдіть у свій акаунт Природні Мандри, щоб продовжити свою подорож та ділитися еко-історіями.",
};

export default function LoginPage() {
  return (
    <>
      <h1 className={css.title}>Вхід</h1>
      <p className={css.text}>Вітаємо знову у спільноті мандрівників!</p>
      <LoginForm />
    </>
  );
}
