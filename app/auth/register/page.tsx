import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import css from "./page.module.css";
import PageTitle from "@/components/PageTitle/PageTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Реєстрація",
  description:
    "Зареєструйтесь, щоб почати свою подорож та ділитися еко-історіями.",
};

export default function RegisterPage() {
  return (
    <>
      <PageTitle align="center">Реєстрація</PageTitle>
      <p className={css.registerFormParagraph}>
        Раді вас бачити у спільноті мандрівників!
      </p>
      <RegistrationForm />
    </>
  );
}
