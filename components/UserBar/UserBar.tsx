"use client";

import Link from "next/link";
import styles from "./UserBar.module.css";
import Image from "next/image";
import { Icon } from "../Icon/Icon";
import { useAuthStore } from "@/lib/store/authStore";
import { logoutUser } from "@/lib/api/auth/clientApi";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { ModeModal } from "../ModeModal/ModeModal";

type Props = {
  showPublish?: boolean;
};

export default function UserBar({ showPublish = true }: Props) {
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
      <div className={styles.user}>
        {showPublish && (
          <Link href="/stories/new" className={styles.publish}>
            Опублікувати статтю
          </Link>
        )}

        <div className={styles.bottom}>
          <Link href="/profile" className={styles.profile}>
            <div className={styles.avatar}>
              {user?.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  width={32}
                  height={32}
                  className={styles.avatarImg}
                />
              ) : (
                <Image
                  src={"/default-avatar.jpg"}
                  alt={"default avatar"}
                  width={32}
                  height={32}
                  className={styles.avatarImg}
                />
              )}
            </div>

            <span className={styles.name}>{user?.name || "Ім'я"}</span>
          </Link>

          <span className={styles.divider} />

          <button
            className={styles.logout}
            onClick={() => setIsModalOpen(true)}
            aria-label="Вийти"
          >
            <Icon id="icon-logout" className={styles.logoutSvg} />
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
