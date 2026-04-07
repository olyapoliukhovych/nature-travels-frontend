"use client";

import { useState, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextareaAutosize from "react-textarea-autosize";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { CreateStoryValues } from "@/types/types";
import { getCategories } from "@/lib/api/category/clientApi";
import PageTitle from "../PageTitle/PageTitle";
import AppSelect from "../AppSelect/AppSelect";
import css from "./AddStoryForm.module.css";
import { createStory } from "@/lib/api/stories/clientApi";
import toast from "react-hot-toast";
import Button from "../Button/Button";

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

const initialValues: CreateStoryValues = {
  title: "",
  categoryId: "",
  article: "",
  image: null,
};

const AddStoryForm = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categoryOptions = useMemo(
    () => categories.map((cat) => ({ value: cat._id, label: cat.category })),
    [categories],
  );

  const handleOnSubmit = async (
    values: CreateStoryValues,
    { resetForm }: FormikHelpers<CreateStoryValues>,
  ) => {
    try {
      const story = await createStory({
        title: values.title,
        categoryId: values.categoryId,
        article: values.article,
        img: values.image,
      });

      if (!story) throw new Error("Помилка при створенні історії");

      toast.success("Історію успішно опубліковано!");
      resetForm();
      setPreview(null);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Щось пішло не так");
      }
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
        {({
          setFieldValue,
          resetForm,
          setFieldTouched,
          values,
          isValid,
          dirty,
        }) => (
          <Form className={css.form}>
            <div className={css.imageSection}>
              <span className={css.span}>Обкладинка статті</span>
              <div className={css.imagePreview}>
                <Image
                  src={preview || "/placeholder.png"}
                  alt={
                    preview
                      ? "Прев'ю завантаженого зображення"
                      : "Місце для обкладинки статті"
                  }
                  width={1191}
                  height={726}
                  className={css.image}
                />
              </div>
              <label className={css.uploadBtn}>
                Завантажити фото
                <input
                  type="file"
                  name="image"
                  value=""
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    if (file) {
                      if (preview) {
                        URL.revokeObjectURL(preview);
                      }

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
              <label htmlFor="title-input" className={css.label}>
                Заголовок
              </label>
              <Field
                id="title-input"
                name="title"
                className={css.input}
                placeholder="Введіть заголовок історії"
              />
              <ErrorMessage
                name="title"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.fieldGroup}>
              <label htmlFor="category-select-input" className={css.label}>
                Категорія
              </label>
              <AppSelect
                inputId="category-select-input"
                instanceId="category-select"
                options={categoryOptions}
                value={
                  categoryOptions.find(
                    (opt) => opt.value === values.categoryId,
                  ) || null
                }
                onChange={(opt) =>
                  setFieldValue("categoryId", opt?.value || "")
                }
                onBlur={() => setFieldTouched("categoryId", true)}
              />
              <ErrorMessage
                name="categoryId"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.fieldGroup}>
              <label htmlFor="article-field" className={css.label}>
                Текст історії
              </label>
              <Field
                id="article-field"
                name="article"
                as={TextareaAutosize}
                className={css.textarea}
                minRows={8}
                placeholder="Ваша історія тут"
              />
              <ErrorMessage
                name="article"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.buttonGroup}>
              <Button
                type="submit"
                className={css.btnSave}
                disabled={!(isValid && dirty)}
              >
                Зберегти
              </Button>
              <Button
                type="button"
                variant="neutral"
                className={css.btnCancel}
                onClick={() => {
                  resetForm();
                  setPreview(null);
                }}
              >
                Відмінити
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddStoryForm;
