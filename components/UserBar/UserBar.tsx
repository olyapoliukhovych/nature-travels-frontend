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

export default function UserBar() {
  const user = useAuthStore((s) => s.user);
  const clear = useAuthStore((s) => s.clearIsAuthenticated);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {}

    clear();
    window.location.href = "/";
  };

  return (
    <>
      <div className={css.user}>
        <div className={css.bottom}>
          <Link href="/profile/my-stories" className={css.profile}>
            <div className={css.avatar}>
              {user?.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  width={32}
                  height={32}
                  className={css.avatarImg}
                />
              ) : (
                <Image
                  src={"/default-avatar.jpg"}
                  alt={"default avatar"}
                  width={32}
                  height={32}
                  className={css.avatarImg}
                />
              )}
            </div>

            <span className={css.name}>{user?.name || "Ім'я"}</span>
          </Link>

          <span className={css.divider} />

          <button
            className={css.logout}
            onClick={() => setIsModalOpen(true)}
            aria-label="Вийти"
          >
            <Icon id="icon-logout" className={css.logoutSvg} />
          </button>
        </div>
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
