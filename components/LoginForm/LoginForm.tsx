"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import css from "./LoginForm.module.css";
import Button from "../Button/Button";
import { LoginValues } from "../../types/types";
import { useAuthStore } from "@/lib/store/authStore";
import { loginUser } from "@/lib/api/auth/clientApi";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Невірний формат email")
    .required("Email обов'язковий"),
  password: Yup.string().required("Пароль обов'язковий"),
});

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const emailId = "login-email";
  const passwordId = "login-password";

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>,
  ) => {
    try {
      const data = await loginUser(values);

      setUser(data);

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: "login-error" });
      } else {
        toast.error("Щось пішло не так", { id: "login-err" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik<LoginValues>
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={css.loginForm}>
            <div className={css.loginField}>
              <label className={css.loginLabel} htmlFor={emailId}>
                Пошта*
              </label>
              <Field
                id={emailId}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="hello@podorozhnyky.ua"
                className={`${css.loginInput} ${
                  errors.email && touched.email ? css.loginInputError : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.loginErrorText}
              />
            </div>

            <div className={css.loginField}>
              <label className={css.loginLabel} htmlFor={passwordId}>
                Пароль*
              </label>
              <Field
                id={passwordId}
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Введіть пароль"
                className={`${css.loginInput} ${
                  errors.password && touched.password ? css.loginInputError : ""
                }`}
              />
              <ErrorMessage
                name="password"
                component="span"
                className={css.loginErrorText}
              />
            </div>

            <Button
              type="submit"
              variant="mantis"
              isLoading={isSubmitting}
              loadingText="Вхід"
              className={css.loginSubmitButton}
            >
              Увійти
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
