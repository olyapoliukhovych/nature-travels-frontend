"use client";

import Link from "next/link";
import styles from "./UserBar.module.css";
// import Image from "next/image";
import { Icon } from "../Icon/Icon";
// import toast from "react-hot-toast";
// import Button from "../Button/Button";
// import { useUserStore } from "@/store/userStore";

// const { user } = useUserStore();

type Props = {
  showPublish?: boolean;
  // user: {
  //   name: string;
  //   avatarUrl: string;
  // };
};

export default function UserBar({ showPublish = true }: Props) {
  // const logoutStore = useUserStore((s) => s.logout);

  // const handleLogout = async () => {
  //   try {
  //     await userLogout();
  //   } catch (error) {
  //     toast.error(error.message);
  //   }

  //   logoutStore();
  //   window.location.href = "/";
  // };

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
            {/* {user.avatarUrl ? (
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
          )} */}
          </div>

          <Link href="/profile" className={styles.name}>
            Ім&apos;я
            {/* {user.name} */}
          </Link>
        </div>

        <span className={styles.divider} />

        <button
          className={styles.logout}
          // onClick={handleLogout}
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
