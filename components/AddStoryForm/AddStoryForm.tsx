"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import TextareaAutosize from "react-textarea-autosize";
import { CreateStoryValues } from "@/types/types";
import css from "./AddStoryForm.module.css";
import PageTitle from "../PageTitle/PageTitle";

interface BackendCategory {
  _id: string;
  category: string;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Заголовок має бути не менше 5 символів")
    .required("Це обов'язкове поле"),
  categoryId: Yup.string().required("Оберіть категорію"),
  article: Yup.string()
    .min(20, "Текст має бути не менше 20 символів")
    .required("Це обов'язкове поле"),
  image: Yup.mixed().required("Додайте зображення"),
});

const AddStoryForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<BackendCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // ВАЖЛИВО: Переконайся, що порт 3000 — це порт твого Node.js сервера
        const response = await fetch("http://localhost:3000/categories");

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

  const handleOnSubmit = (values: CreateStoryValues) => {
    console.log("Дані готові:", values);
  };

  return (
    <div className={css.formWrapper}>
      <PageTitle>Створити нову історію</PageTitle>

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
                  <img src={preview} alt="Preview" />
                ) : (
                  <img
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
                type="button"
                className={css.btnCancel}
                onClick={() => {
                  resetForm();
                  setPreview(null);
                }}
              >
                Відмінити
              </button>
              <button
                type="submit"
                className={css.btnSave}
                disabled={!(isValid && dirty)}
              >
                Зберегти
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddStoryForm;
