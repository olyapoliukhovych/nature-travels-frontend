"use client";

import { useState, useMemo, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getCategories } from "@/lib/api/category/clientApi";
import PageTitle from "../PageTitle/PageTitle";
import AppSelect from "../AppSelect/AppSelect";
import css from "./AddStoryForm.module.css";
import { createStory, updateStory } from "@/lib/api/stories/clientApi";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import { useStoryDraftStore } from "@/lib/store/createStoryStore";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { CreateStoryResponse, CreateStoryValues, Story } from "@/types/stories";
import DeleteStoryButton from "../DeleteStoryButton/DeleteStoryButton";
import Loader from "../Loader/Loader";

const getValidationSchema = (isEditMode: boolean) =>
  Yup.object({
    title: Yup.string()
      .min(3, "Заголовок має бути не менше 3 символів")
      .required("Це обов'язкове поле"),
    categoryId: Yup.string().required("Оберіть категорію"),
    article: Yup.string()
      .min(3, "Текст має бути не менше 3 символів")
      .required("Це обов'язкове поле"),
    img: isEditMode
      ? Yup.mixed().nullable()
      : Yup.mixed().required("Додайте зображення"),
  });

interface AddStoryFormProps {
  initialData?: Story;
  isEditMode?: boolean;
}

const FormikObserver = () => {
  const { values } = useFormikContext<CreateStoryValues>();
  const setDraft = useStoryDraftStore((state) => state.setDraft);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDraft({
        title: values.title,
        categoryId: values.categoryId,
        article: values.article,
      });
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [setDraft, values.article, values.categoryId, values.title]);

  return null;
};

const AddStoryForm = ({
  initialData,
  isEditMode = false,
}: AddStoryFormProps) => {
  const router = useRouter();
  const clearDraft = useStoryDraftStore((state) => state.clearDraft);
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string | null>(
    initialData?.img || null,
  );
  const [isDraftHydrated, setIsDraftHydrated] = useState(
    isEditMode || useStoryDraftStore.persist.hasHydrated(),
  );

  // при розмонтуванні компонента видаляємо посилання на фото з пам'яті, щоб не засмічувати
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  useEffect(() => {
    if (isEditMode || isDraftHydrated) {
      return;
    }

    const unsubscribe = useStoryDraftStore.persist.onFinishHydration(() => {
      setIsDraftHydrated(true);
    });

    return unsubscribe;
  }, [isDraftHydrated, isEditMode]);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { mutate, isPending } = useMutation<
    Story | CreateStoryResponse,
    Error,
    CreateStoryValues
  >({
    mutationFn: (values) => {
      if (isEditMode && initialData?._id) {
        return updateStory(initialData._id, {
          title: values.title,
          categoryId: values.categoryId,
          article: values.article,
          img: values.img,
        });
      }
      return createStory({
        title: values.title,
        categoryId: values.categoryId,
        article: values.article,
        img: values.img as File,
      });
    },
    onSuccess: (data) => {
      toast.success(
        isEditMode
          ? "Історію успішно оновлено!"
          : "Історію успішно опубліковано!",
        { id: "publish-success" },
      );

      if (!isEditMode) clearDraft();

      queryClient.invalidateQueries({ queryKey: ["stories"] });
      queryClient.invalidateQueries({ queryKey: ["user-public-stories"] });

      const storyId = "_id" in data ? data._id : initialData?._id;

      router.push(storyId ? `/stories/${storyId}` : "/profile/my-stories");
    },
    onError: (error) => {
      toast.error(error.message || "Сталася помилка", { id: "publish-error" });
    },
  });

  const categoryOptions = useMemo(
    () => categories.map((cat) => ({ value: cat._id, label: cat.category })),
    [categories],
  );

  if (!isEditMode && !isDraftHydrated) {
    return <Loader size="md" />;
  }

  const draftValues = isEditMode ? null : useStoryDraftStore.getState().draft;

  const initialValues: CreateStoryValues = {
    title: isEditMode ? initialData?.title || "" : draftValues?.title || "",
    categoryId: isEditMode
      ? typeof initialData?.categoryId === "object"
        ? initialData.categoryId._id
        : initialData?.categoryId || ""
      : draftValues?.categoryId || "",
    article: isEditMode
      ? initialData?.article || ""
      : draftValues?.article || "",
    img: null,
  };

  return (
    <div className={css.formWrapper}>
      <PageTitle className={css.pageTitle}>
        {isEditMode ? "Редагувати історію" : "Створити нову історію"}
      </PageTitle>

      <Formik
        initialValues={initialValues}
        enableReinitialize={isEditMode}
        validationSchema={getValidationSchema(isEditMode)}
        onSubmit={(values) => mutate(values)}
      >
        {({ setFieldValue, setFieldTouched, values, isValid }) => (
          <Form className={css.form}>
            {!isEditMode && <FormikObserver />}
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
                  loading="eager"
                />
              </div>
              <label className={css.uploadBtn}>
                {isEditMode ? "Змінити фото" : "Завантажити фото"}
                <input
                  id="image-upload"
                  type="file"
                  name="img"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    if (file) {
                      if (preview && preview.startsWith("blob:")) {
                        URL.revokeObjectURL(preview);
                      }

                      setFieldValue("img", file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
              <ErrorMessage name="img" component="div" className={css.error} />
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

            <div className={css.allButtonsGroup}>
              <div className={css.mainButtonsGroup}>
                <Button
                  type="submit"
                  className={css.btnSave}
                  disabled={!isValid || isPending}
                >
                  {isPending ? <Loader size="sm" /> : "Зберегти"}
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

              {isEditMode && initialData?._id && (
                <DeleteStoryButton storyId={initialData._id} />
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddStoryForm;
