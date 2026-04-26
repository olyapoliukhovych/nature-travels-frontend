"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStory } from "@/lib/api/stories/clientApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Modal from "../Modal/Modal";
import { ModeModal } from "../ModeModal/ModeModal";
import Button from "../Button/Button";
import { MdDelete } from "react-icons/md";
import css from "./DeleteStoryButton.module.css";
import Loader from "../Loader/Loader";

interface Props {
  storyId: string;
}

export default function DeleteStoryButton({ storyId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteStory(storyId),
    onSuccess: () => {
      toast.success("Історію видалено");

      queryClient.invalidateQueries({ queryKey: ["stories"] });
      queryClient.invalidateQueries({ queryKey: ["user-public-stories"] });

      router.push("/profile/my-stories");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Не вдалося видалити історію");
    },
  });

  return (
    <>
      <Button
        type="button"
        variant="neutral"
        className={css.deleteBtn}
        onClick={() => setIsModalOpen(true)}
        disabled={isPending}
      >
        {isPending ? <Loader size="sm" /> : <MdDelete />}
      </Button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ModeModal
            mode="delete"
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
