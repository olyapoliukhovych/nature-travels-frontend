"use client";

import AppLink from "../AppLink/AppLink";
import { Icon } from "../Icon/Icon";
import css from "./BackLink.module.css";
import { useAuthStore } from "@/lib/store/authStore";

interface BackLinkProps {
  variant: "stories" | "travellers";
  storyOwnerId?: string;
  className?: string;
}

export default function BackLink({
  variant,
  storyOwnerId,
  className,
}: BackLinkProps) {
  const userId = useAuthStore((state) => state.user?._id);
  const isOwnStory =
    variant === "stories" && !!storyOwnerId && userId === storyOwnerId;

  const href =
    variant === "travellers"
      ? "/travellers"
      : isOwnStory
        ? "/profile/my-stories"
        : "/stories";

  const label =
    variant === "travellers"
      ? "Всі мандрівники"
      : isOwnStory
        ? "Мої статті"
        : "Всі статті";

  return (
    <AppLink
      href={href}
      className={`${css.link} ${className ?? ""}`}
      variant="base"
    >
      <Icon id="icon-chevron_left" className={css.icon} />
      {label}
    </AppLink>
  );
}
