import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import css from "../page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Реєстрація",
  description:
    "Зареєструйтесь, щоб почати свою подорож та ділитися еко-історіями.",
};

export default function RegisterPage() {
  return (
    <>
      <h1 className={css.title}>Реєстрація</h1>
      <p className={css.text}>Раді вас бачити у спільноті мандрівників!</p>
      <RegistrationForm />
    </>
  );
}
