"use client";

import { useState, useMemo, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getCategories } from "@/lib/api/category/clientApi";
import AppSelect from "../AppSelect/AppSelect";
import css from "./AddStoryForm.module.css";
import { createStory, updateStory } from "@/lib/api/stories/clientApi";
import { getUserProfile } from "@/lib/api/users/clientApi";
import toast from "react-hot-toast";
import { getUserFriendlyErrorMessage } from "@/lib/utils/getErrorMessage";
import Button from "../Button/Button";
import { useStoryDraftStore } from "@/lib/store/createStoryStore";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { CreateStoryValues, Story } from "@/types/stories";
import DeleteStoryButton from "../DeleteStoryButton/DeleteStoryButton";
import Loader from "../Loader/Loader";
import { useAuthStore } from "@/lib/store/authStore";
import AnimatedText from "../AnimatedText/AnimatedText";

const getValidationSchema = (isEditMode: boolean) =>
  Yup.object({
    title: Yup.string()
      .trim()
      .min(3, "Заголовок має бути не менше 3 символів")
      .max(100, "Заголовок занадто довгий (макс. 100 символів)")
      .required("Це обов'язкове поле"),
    categoryId: Yup.string().required("Оберіть категорію"),
    article: Yup.string()
      .trim()
      .min(3, "Текст має бути не менше 3 символів")
      .max(5000, "Стаття занадто довга (макс. 5000 символів)")
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
  const draftValues = useStoryDraftStore((state) => state.draft);
  const clearDraft = useStoryDraftStore((state) => state.clearDraft);
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string | null>(
    initialData?.img || null,
  );
  const [isDraftHydrated, setIsDraftHydrated] = useState(isEditMode);

  // при розмонтуванні компонента видаляємо посилання на фото з пам'яті
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  useEffect(() => {
    if (isEditMode) {
      return;
    }

    const persistApi = useStoryDraftStore.persist;

    if (!persistApi) {
      const timeoutId = window.setTimeout(() => {
        setIsDraftHydrated(true);
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }

    if (persistApi.hasHydrated()) {
      const timeoutId = window.setTimeout(() => {
        setIsDraftHydrated(true);
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }

    const unsubscribe = persistApi.onFinishHydration(() => {
      setIsDraftHydrated(true);
    });

    return unsubscribe;
  }, [isEditMode]);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { mutate, isPending } = useMutation<Story, Error, CreateStoryValues>({
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
    onSuccess: async (data) => {
      toast.success(
        isEditMode
          ? "Історію успішно оновлено!"
          : "Історію успішно опубліковано!",
        { id: "publish-success" },
      );

      if (!isEditMode) clearDraft();

      if (!isEditMode) {
        queryClient.removeQueries({
          queryKey: ["profile-stories", "my"],
          exact: true,
        });
        queryClient.removeQueries({
          queryKey: ["profile-stories-initial", "my"],
          exact: true,
        });
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["stories"] }),
        queryClient.invalidateQueries({ queryKey: ["profile-stories"] }),
        queryClient.invalidateQueries({
          queryKey: ["profile-stories-initial"],
        }),
        queryClient.invalidateQueries({ queryKey: ["user-public-stories"] }),
        queryClient.invalidateQueries({ queryKey: ["user-profile"] }),
        queryClient.invalidateQueries({ queryKey: ["user-public"] }),
      ]);

      try {
        const updatedUser = await getUserProfile();
        setUser(updatedUser);
      } catch (error) {
        console.error(error);
      }

      const storyId = data?._id;

      if (!storyId) {
        console.error("No storyId returned");
        return;
      }

      router.push(`/stories/${storyId}`);
    },
    onError: (error) => {
      toast.error(getUserFriendlyErrorMessage(error), { id: "publish-error" });
    },
  });

  const categoryOptions = useMemo(
    () => categories.map((cat) => ({ value: cat._id, label: cat.category })),
    [categories],
  );

  if (!isEditMode && !isDraftHydrated) {
    return <Loader size="md" />;
  }

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
      <AnimatedText className={css.title}>
        {isEditMode ? "Редагувати історію" : "Створити нову історію"}
      </AnimatedText>

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
              <AnimatedText tag="span" className={css.span}>
                Обкладинка статті
              </AnimatedText>
              <div className={css.imagePreview}>
                <Image
                  src={preview || "/placeholder.png"}
                  alt={
                    preview
                      ? "Прев'ю завантаженого зображення"
                      : "Місце для обкладинки статті"
                  }
                  fill
                  sizes="(min-width: 1440px) 1091px, 100%"
                  className={css.image}
                  priority
                />
              </div>
              <label className={css.uploadBtn}>
                <AnimatedText tag="span">
                  {isEditMode ? "Змінити фото" : "Завантажити фото"}
                </AnimatedText>

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
              <AnimatedText
                tag="label"
                htmlFor="title-input"
                className={css.label}
              >
                Заголовок
              </AnimatedText>
              <Field
                id="title-input"
                name="title"
                className={css.input}
                maxLength={100}
                placeholder="Введіть заголовок історії"
              />
              <div className={css.titleCharCount}>
                {values.title.length} / 100
              </div>
              <ErrorMessage
                name="title"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.fieldGroup}>
              <AnimatedText
                tag="label"
                htmlFor="category-select-input"
                className={css.label}
              >
                Категорія
              </AnimatedText>
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
              <AnimatedText
                tag="label"
                htmlFor="article-field"
                className={css.label}
              >
                Текст історії
              </AnimatedText>
              <Field
                id="article-field"
                name="article"
                autoComplete="off"
                as={TextareaAutosize}
                className={css.textarea}
                maxLength={5000}
                placeholder="Ваша історія тут"
              />
              <div className={css.articleCharCount}>
                {values.article.length} / 5000
              </div>
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
