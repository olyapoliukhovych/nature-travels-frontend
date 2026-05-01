"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/lib/api/users/clientApi";
import { logoutUser } from "@/lib/api/auth/clientApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getUserFriendlyErrorMessage } from "@/lib/utils/getErrorMessage";
import Modal from "../Modal/Modal";
import { ModeModal } from "../ModeModal/ModeModal";
import Button from "../Button/Button";
import { MdDelete } from "react-icons/md";
import css from "../DeleteStoryButton/DeleteStoryButton.module.css";
import Loader from "../Loader/Loader";
import { useAuthStore } from "@/lib/store/authStore";

export default function DeleteProfileButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearIsAuthenticated);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteUser,

    onSuccess: async () => {
      toast.success("Профіль видалено");

      await logoutUser();

      queryClient.clear();

      clearAuth();

      router.push("/");
    },

    onError: (error: Error) => {
      toast.error(getUserFriendlyErrorMessage(error));
    },
  });

  return (
    <>
      <Button
        type="button"
        title="Видалити профіль"
        variant="neutral"
        className={css.deleteBtn}
        onClick={() => setIsModalOpen(true)}
        disabled={isPending}
      >
        {isPending ? (
          <Loader size="sm" />
        ) : (
          <>
            <MdDelete />
            <span className={css.deleteText}>Видалити профіль</span>
          </>
        )}
      </Button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ModeModal
            mode="deleteProfile"
            onClose={() => setIsModalOpen(false)}
            onDelete={() => {
              mutate();
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}
