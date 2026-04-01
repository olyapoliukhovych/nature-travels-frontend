import AuthFooter from "@/components/AuthFooter/AuthFooter";
import AuthHeader from "@/components/AuthHeader/AuthHeader";
import MainAuthNav from "@/components/MainAuthNav/MainAuthNav";
import css from "./page.module.css";
import LoginForm from "@/components/LoginForm/LoginForm";
export default function AuthPage() {
  return (
    <div className={css.loginPageContainer}>
      <AuthHeader />

      <main className={css.loginMainContent}>
        <div className={css.loginAuthWrapper}>
          <MainAuthNav />

          <h2 className={css.loginFormTitle}>Вхід</h2>
          <p className={css.loginFormParagraph}>
            Вітаємо знову у спільноті мандрівників!
          </p>

          <LoginForm />
        </div>
      </main>
      <footer className={css.loginPageFooterWrapper}>
        <AuthFooter />
      </footer>
    </div>
  );
}
