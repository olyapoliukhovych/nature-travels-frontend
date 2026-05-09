"use client";

import css from "./ProfileSettingsForm.module.css";
import { useEffect, useMemo, useState } from "react";
import {
  updateUser,
  updateUserAvatar,
  getUserProfile,
} from "@/lib/api/users/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import toast from "react-hot-toast";
import { getUserFriendlyErrorMessage } from "@/lib/utils/getErrorMessage";
import { UserPrivate } from "@/types/user";
import Loader from "@/components/Loader/Loader";
import Image from "next/image";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import DeleteProfileButton from "../DeleteProfileButton/DeleteProfileButton";
import AnimatedText from "../AnimatedText/AnimatedText";

interface Props {
  user: UserPrivate;
}

export default function ProfileSettingsForm({ user }: Props) {
  const { setUser } = useAuthStore();

  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user.avatarUrl || null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const isNameValid = name.trim().length >= 3 && name.trim().length <= 32;
  const isEmailValid = email.length <= 64 && /^\S+@\S+\.\S+$/.test(email);

  const isDirty = useMemo(() => {
    return name !== user.name || email !== user.email || file !== null;
  }, [name, email, file, user.name, user.email]);

  const isFormValid = isNameValid && isEmailValid;

  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.error("Перевірте дані");
      return;
    }

    try {
      setIsLoading(true);

      const isNameChanged = name !== user.name;
      const isEmailChanged = email !== user.email;

      if (isNameChanged || isEmailChanged) {
        await updateUser({ name, email });
      }

      if (file) {
        await updateUserAvatar(file);
      }

      const updatedUser = await getUserProfile();
      if (!updatedUser) {
        throw new Error("User not found");
      }
      setUser(updatedUser);

      if (isNameChanged || file) {
        toast.success("Профіль оновлено");
      }
      if (updatedUser.pendingEmail) {
        toast.success("Підтвердіть email на пошті");
      }

      router.push("/profile/my-stories");
    } catch (e: unknown) {
      toast.error(getUserFriendlyErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.wrapper}>
      <AnimatedText className={css.title}>Налаштування профілю</AnimatedText>

      <div className={css.form}>
        <div>
          <div className={css.avatarWrapper}>
            <Image
              src={preview || "/default-avatar.jpg"}
              alt="avatar"
              fill
              className={css.avatar}
              sizes="145px"
              priority
            />
          </div>

          <AnimatedText
            className={css.uploadBtn}
            tag="label"
            htmlFor="image-upload"
          >
            Завантажити фото
          </AnimatedText>
          <input
            className={css.fileInput}
            id="image-upload"
            name="img"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <input
          className={css.input}
          name="name"
          id="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше імʼя та прізвище"
          min={3}
          max={32}
        />

        <div className={css.emailWrapper}>
          <input
            className={css.input}
            name="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hello@podorozhnyky.ua"
            max={64}
          />
          {user.pendingEmail && (
            <div className={css.pendingEmail}>
              Очікує підтвердження: {user.pendingEmail}
            </div>
          )}
        </div>

        <div className={css.allButtonsGroup}>
          <div className={css.mainButtonsGroup}>
            <Button
              className={css.btnSave}
              onClick={handleSubmit}
              disabled={
                !isDirty ||
                !isFormValid ||
                isLoading ||
                name.trim() === "" ||
                email.trim() === ""
              }
            >
              {isLoading ? <Loader size="sm" /> : "Зберегти"}
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

          <DeleteProfileButton />
        </div>
      </div>
    </div>
  );
}
