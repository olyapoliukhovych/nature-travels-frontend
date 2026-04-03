import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import css from "./page.module.css";

export default function RegisterPage() {
  return (
    <>
      <h1 className={css.registerFormTitle}>Реєстрація</h1>
      <p className={css.registerFormParagraph}>
        Раді вас бачити у спільноті мандрівників!
      </p>
      <RegistrationForm />
    </>
  );
}
