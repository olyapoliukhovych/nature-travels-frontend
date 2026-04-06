"use client";

import Link from "next/link";
import styles from "./UserBar.module.css";
import Image from "next/image";
import { Icon } from "../Icon/Icon";
// import { User } from "@/types/user";
// import Button from "../Button/Button";
import { useAuthStore } from "@/lib/store/authStore";
import { logoutUser } from "@/lib/api/auth/clientApi";

type Props = {
  showPublish?: boolean;
};

export default function UserBar({ showPublish = true }: Props) {
  const user = useAuthStore((s) => s.user);
  const clear = useAuthStore((s) => s.clearIsAuthenticated);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {}

    clear();
    window.location.href = "/";
  };

  return (
    <div className={styles.user}>
      {showPublish && (
        <Link href="/stories/new" className={styles.publish}>
          Опублікувати статтю
        </Link>
      )}

      <div className={styles.bottom}>
        <div className={styles.profile}>
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
              <svg width="32" height="32" aria-hidden="true">
                <use href="/sprite.svg#icon-user" />
              </svg>
            )}
          </div>

          <Link href="/profile" className={styles.name}>
            {user?.name || "Ім'я"}
          </Link>
        </div>

        <span className={styles.divider} />

        <button
          className={styles.logout}
          onClick={handleLogout}
          aria-label="Вийти"
        >
          {/* <svg width="24" height="24" aria-hidden="true">
            <use href="/sprite.svg#icon-logout" />
          </svg> */}
          <Icon id="icon-logout" className={styles.logoutSvg} />
        </button>
      </div>
    </div>
  );
}
