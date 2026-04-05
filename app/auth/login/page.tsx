import LoginForm from "@/components/LoginForm/LoginForm";
import css from "./page.module.css";
import PageTitle from "@/components/PageTitle/PageTitle";

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
