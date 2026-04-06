"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import css from "./RegistrationForm.module.css";
import Button from "../Button/Button";
import { RegistrationValues } from "../../types/types";
import { useAuthStore } from "@/lib/store/authStore";
import { loginUser, registerUser } from "@/lib/api/auth/clientApi";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Ім'я надто коротке")
    .max(32, "Ім'я надто довге")
    .required("Ім'я обов'язкове"),
  email: Yup.string()
    .email("Невірний формат email")
    .max(64, "Email надто довгий")
    .required("Email обов'язковий"),
  password: Yup.string()
    .min(8, "Пароль має бути не менше 8 символів")
    .max(128, "Пароль  має бути не більше 128 символів")
    .required("Пароль обов'язковий"),
});

export default function RegistrationForm() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const nameId = "registration-name";
  const emailId = "registration-email";
  const passwordId = "registration-password";

  const handleSubmit = async (
    values: RegistrationValues,
    { setSubmitting }: FormikHelpers<RegistrationValues>,
  ) => {
    try {
      await registerUser(values);

      const data = await loginUser({
        email: values.email,
        password: values.password,
      });

      setUser(data);

      router.push("/");
      router.refresh();
    } catch (error) {
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
      <Formik<RegistrationValues>
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={css.registrationForm} noValidate>
            <div className={css.registrationField}>
              <label className={css.registrationLabel} htmlFor={nameId}>
                Імʼя та Прізвище*
              </label>
              <Field
                id={nameId}
                name="name"
                autoComplete="name"
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
              <label className={css.registrationLabel} htmlFor={emailId}>
                Пошта*
              </label>
              <Field
                id={emailId}
                name="email"
                type="email"
                autoComplete="email"
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
              <label className={css.registrationLabel} htmlFor={passwordId}>
                Пароль*
              </label>
              <Field
                id={passwordId}
                name="password"
                type="password"
                autoComplete="new-password"
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
              Зареєструватись
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
