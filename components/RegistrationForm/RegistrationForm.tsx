"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import css from "./RegistrationForm.module.css";
import Button from "../Button/Button";
import { RegistrationValues } from "../../types/types";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім'я надто коротке")
    .max(50, "Ім'я надто довге")
    .required("Ім'я обов'язкове"),
  email: Yup.string()
    .email("Невірний формат email")
    .required("Email обов'язковий"),
  password: Yup.string()
    .min(8, "Пароль має бути не менше 8 символів")
    .required("Пароль обов'язковий"),
});

export default function RegistrationForm() {
  const router = useRouter();

  const handleSubmit = async (
    values: RegistrationValues,
    { setSubmitting }: FormikHelpers<RegistrationValues>,
  ) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Помилка реєстрації");
      }

      router.push("/");
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Щось пішло не так");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      <Formik<RegistrationValues>
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={css.registrationForm} noValidate>
            <div className={css.registrationField}>
              <label className={css.registrationLabel}>Імʼя та Прізвище*</label>
              <Field
                name="name"
                placeholder="Ваше імʼя та прізвище"
                className={`${css.registrationInput} ${errors.name && touched.name ? css.registrationInputError : ""}`}
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.registrationErrorText}
              />
            </div>

            <div className={css.registrationField}>
              <label className={css.registrationLabel}>Пошта</label>
              <Field
                name="email"
                type="email"
                placeholder="hello@podorozhnyky.ua"
                className={`${css.registrationInput} ${errors.email && touched.email ? css.registrationInputError : ""}`}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.registrationErrorText}
              />
            </div>

            <div className={css.registrationField}>
              <label className={css.registrationLabel}>Пароль</label>
              <Field
                name="password"
                type="password"
                placeholder="Введіть пароль"
                className={`${css.registrationInput} ${errors.password && touched.password ? css.registrationInputError : ""}`}
              />
              <ErrorMessage
                name="password"
                component="span"
                className={css.registrationErrorText}
              />
            </div>
            <Button
              type="submit"
              variant="mantis"
              isLoading={isSubmitting}
              loadingText="Реєстрація"
              className={css.registrationSubmitButton}
            >
              Зареєструватися
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
