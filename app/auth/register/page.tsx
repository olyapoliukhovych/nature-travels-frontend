import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import css from "./page.module.css";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Реєстрація",
  description:
    "Зареєструйтесь, щоб почати свою подорож та ділитися еко-історіями.",
};

export default function RegisterPage() {
  return (
    <>
      <AnimatedText align="center">Реєстрація</AnimatedText>
      <AnimatedText
        tag="p"
        align="center"
        className={css.registerFormParagraph}
      >
        Раді вас бачити у спільноті мандрівників!
      </AnimatedText>
      <RegistrationForm />
    </>
  );
}
