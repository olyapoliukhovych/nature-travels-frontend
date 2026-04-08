"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormikContext,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { CreateStoryValues } from "@/types/types";
import { getCategories } from "@/lib/api/category/clientApi";
import PageTitle from "../PageTitle/PageTitle";
import AppSelect from "../AppSelect/AppSelect";
import css from "./AddStoryForm.module.css";
import { createStory } from "@/lib/api/stories/clientApi";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import { useStoryDraftStore } from "@/lib/store/createStoryStore";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

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

const FormikObserver = () => {
  const { values } = useFormikContext<CreateStoryValues>();
  const { setDraft } = useStoryDraftStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDraft({
        title: values.title,
        categoryId: values.categoryId,
        article: values.article,
      });
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [values, setDraft]);

  return null;
}; // стежить за змінами і автоматично викликає setDraft

const AddStoryForm = () => {
  const router = useRouter();
  const { draft, clearDraft } = useStoryDraftStore();
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string | null>(null);

  // при розмонтуванні компонента видаляємо посилання на фото з пам'яті, щоб не засмічувати
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateStoryValues) =>
      createStory({
        title: values.title,
        categoryId: values.categoryId,
        article: values.article,
        img: values.image,
      }),
    onSuccess: (newStory) => {
      toast.success("Історію успішно опубліковано!", { id: "publish-success" });

      clearDraft();
      setPreview(null);

      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["stories"] });

      if (newStory && "_id" in newStory) {
        router.push(`/stories/${newStory._id}`);
      } else {
        router.push("/stories");
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Помилка при створенні",
        { id: "publish-error" },
      );
    },
  });

  const initialValuesWithDraft: CreateStoryValues = {
    title: draft.title || "",
    categoryId: draft.categoryId || "",
    article: draft.article || "",
    image: null,
  };

  const categoryOptions = useMemo(
    () => categories.map((cat) => ({ value: cat._id, label: cat.category })),
    [categories],
  );

  const handleOnSubmit = async (
    values: CreateStoryValues,
    { setSubmitting }: FormikHelpers<CreateStoryValues>,
  ) => {
    mutate(values);
    setSubmitting(false);
  };

  return (
    <div className={css.formWrapper}>
      <PageTitle className={css.pageTitle}>Створити нову історію</PageTitle>

      <Formik
        initialValues={initialValuesWithDraft}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {({ setFieldValue, setFieldTouched, values, isValid }) => (
          <Form className={css.form}>
            <FormikObserver />
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
                disabled={!isValid || isPending}
              >
                Зберегти
                {/* {isPending ? "Зберігаю..." : "Зберегти"} */}
              </Button>
              <Button
                type="button"
                variant="neutral"
                className={css.btnCancel}
                onClick={() => router.back()}
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
