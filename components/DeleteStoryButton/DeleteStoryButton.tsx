"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStory } from "@/lib/api/stories/clientApi";
import { getUserProfile } from "@/lib/api/users/clientApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getUserFriendlyErrorMessage } from "@/lib/utils/getErrorMessage";
import Modal from "../Modal/Modal";
import { ModeModal } from "../ModeModal/ModeModal";
import Button from "../Button/Button";
import { LuTrash2 } from "react-icons/lu";
import css from "./DeleteStoryButton.module.css";
import { useAuthStore } from "@/lib/store/authStore";

interface Props {
  storyId: string;
}

export default function DeleteStoryButton({ storyId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteStory(storyId),
    onSuccess: async () => {
      toast.success("Історію видалено");

      queryClient.removeQueries({
        queryKey: ["profile-stories", "my"],
        exact: true,
      });
      queryClient.removeQueries({
        queryKey: ["profile-stories-initial", "my"],
        exact: true,
      });

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

      router.push("/profile/my-stories");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(getUserFriendlyErrorMessage(error));
    },
  });

  return (
    <>
      <Button
        type="button"
        title="Видалити історію"
        variant="neutral"
        className={css.deleteBtn}
        onClick={() => setIsModalOpen(true)}
        disabled={isPending}
        isLoading={isPending}
        icon={<LuTrash2 />}
      >
        Видалити
      </Button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ModeModal
            mode="deleteStory"
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
