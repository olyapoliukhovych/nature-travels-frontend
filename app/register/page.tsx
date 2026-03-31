import css from "./page.module.css";
import MainAuthNav from "@/components/MainAuthNav/MainAuthNav";
import AuthHeader from "@/components/AuthHeader/AuthHeader";
import AuthFooter from "@/components/AuthFooter/AuthFooter";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";

export default function RegisterPage() {
  return (
    <div className={css.registerPageContainer}>
      <AuthHeader />

      <main className={css.registerMainContent}>
        <div className={css.authWrapper}>
          <MainAuthNav />

          <h2 className={css.registerFormTitle}>Реєстрація</h2>
          <p className={css.registerFormParagraph}>
            Раді вас бачити у спільноті мандрівників!
          </p>

          <RegistrationForm />
        </div>
      </main>
      <footer className={css.registerPageFooterWrapper}>
        <AuthFooter />
      </footer>
    </div>
  );
}
