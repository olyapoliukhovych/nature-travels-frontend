"use client";

import { useState, useEffect } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldProps,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import TextareaAutosize from "react-textarea-autosize";
import { CreateStoryValues } from "@/types/types";
import css from "./AddStoryForm.module.css";
import PageTitle from "../PageTitle/PageTitle";
import Image from "next/image";
import { Category } from "@/types/category";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Заголовок має бути не менше 3 символів")
    .required("Це обов'язкове поле"),
  categoryId: Yup.string().required("Оберіть категорію"),
  article: Yup.string()
    .min(3, "Текст має бути не менше 3 символів")
    .required("Це обов'язкове поле"),
  image: Yup.mixed().required("Додайте зображення"),
});

const AddStoryForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/categories`);

        if (!response.ok) {
          throw new Error(`Помилка сервера: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Не вдалося завантажити категорії:", error);
      }
    };

    fetchCategories();
  }, []);

  const initialValues: CreateStoryValues = {
    title: "",
    categoryId: "",
    article: "",
    image: null,
  };

  const handleOnSubmit = async (
    values: CreateStoryValues,
    { resetForm }: FormikHelpers<CreateStoryValues>,
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("categoryId", values.categoryId);
      formData.append("article", values.article);

      if (values.image) {
        formData.append("img", values.image);
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const token = localStorage.getItem("token");

      const response = await fetch(`${apiUrl}/stories`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Помилка при створенні історії");
      }

      const result = await response.json();
      console.log("Успіх!", result);
      alert("Історію успішно опубліковано!");

      resetForm();
      setPreview(null);
    } catch (error: unknown) {
      console.error("Помилка відправки:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Сталася невідома помилка";
      alert(`Помилка: ${errorMessage}`);
    }
  };

  return (
    <div className={css.formWrapper}>
      <PageTitle className={css.pageTitle}>Створити нову історію</PageTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {({ setFieldValue, resetForm, isValid, dirty }) => (
          <Form className={css.form}>
            <div className={css.imageSection}>
              <span className={css.label}>Обкладинка статті</span>
              <div className={css.imagePreview}>
                {preview ? (
                  <Image src={preview} alt="Preview" />
                ) : (
                  <Image
                    src="/placeholder.png"
                    alt="Placeholder"
                    className={css.placeholderImg}
                  />
                )}
              </div>

              <label className={css.uploadBtn}>
                Завантажити фото
                <input
                  type="file"
                  name="image"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    if (file) {
                      setFieldValue("image", file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
              <ErrorMessage
                name="image"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.fieldGroup}>
              <label className={css.label}>Заголовок</label>
              <Field
                name="title"
                className={css.input}
                placeholder="Введіть назву історії"
              />
              <ErrorMessage
                name="title"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.fieldGroup}>
              <label className={css.label}>Категорія</label>
              <Field as="select" name="categoryId" className={css.select}>
                <option value="">Оберіть категорію</option>
                {categories.length > 0 &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.category}
                    </option>
                  ))}
              </Field>
              <ErrorMessage
                name="categoryId"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.fieldGroup}>
              <label className={css.label}>Текст історії</label>
              <Field name="article">
                {({ field }: FieldProps) => (
                  <TextareaAutosize
                    {...field}
                    className={css.textarea}
                    minRows={8}
                  />
                )}
              </Field>
              <ErrorMessage
                name="article"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.buttonGroup}>
              <button
                type="submit"
                className={css.btnSave}
                disabled={!(isValid && dirty)}
              >
                Зберегти
              </button>
              <button
                type="button"
                className={css.btnCancel}
                onClick={() => {
                  resetForm();
                  setPreview(null);
                }}
              >
                Відмінити
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddStoryForm;
