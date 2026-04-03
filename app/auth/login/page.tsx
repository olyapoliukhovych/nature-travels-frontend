import LoginForm from "@/components/LoginForm/LoginForm";
import css from "./page.module.css";

export default function LoginPage() {
  return (
    <>
      <h1 className={css.loginFormTitle}>Вхід</h1>
      <p className={css.loginFormParagraph}>
        Вітаємо знову у спільноті мандрівників!
      </p>
      <LoginForm />
    </>
  );
}
