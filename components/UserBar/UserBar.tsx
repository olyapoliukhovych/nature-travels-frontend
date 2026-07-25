"use client";

import Link from "next/link";
import css from "./UserBar.module.css";
import Image from "next/image";
import { Icon } from "../Icon/Icon";
import { useAuthStore } from "@/lib/store/authStore";
import { logoutUser } from "@/lib/api/auth/clientApi";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { ModeModal } from "../ModeModal/ModeModal";
import { ThemeToggleButton } from "../ThemeToggleButton/ThemeToggleButton";
import AnimatedText from "../AnimatedText/AnimatedText";
import { AnimationToggleButton } from "../AnimationToggleButton/AnimationToggleButton";

export default function UserBar() {
  const user = useAuthStore((s) => s.user);
  const clear = useAuthStore((s) => s.clearIsAuthenticated);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
    } finally {
      clear();
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className={css.userBar}>
        <Link href="/profile/my-stories" className={css.profile}>
          <div className={css.avatar}>
            <Image
              src={user?.avatarUrl || "/default-avatar.jpg"}
              alt={user?.name || "default avatar"}
              width={32}
              height={32}
              className={css.avatarImg}
              priority
            />
          </div>

          <AnimatedText tag="span" className={css.name}>
            {user?.name || "Ім'я"}
          </AnimatedText>
        </Link>

        <span className={css.divider} />

        <AnimationToggleButton />

        <span className={css.divider} />

        <ThemeToggleButton />

        <span className={css.divider} />

        <button
          className={css.logout}
          onClick={() => setIsModalOpen(true)}
          aria-label="Вийти"
        >
          <Icon id="icon-logout" className={css.logoutSvg} />
        </button>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ModeModal
            mode="logout"
            onClose={() => setIsModalOpen(false)}
            logout={handleLogout}
          />
        </Modal>
      )}
    </>
  );
}
