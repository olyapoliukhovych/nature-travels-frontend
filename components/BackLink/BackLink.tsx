"use client";

import Link from "next/link";
import { Icon } from "../Icon/Icon";
import css from "./BackLink.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import AnimatedText from "../AnimatedText/AnimatedText";
import GrassEffect from "../GrassEffect/GrassEffect";

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
    <Link href={href} className={`${css.link} ${className ?? ""}`}>
      <GrassEffect>
        <Icon id="icon-chevron_left" className={css.icon} />
      </GrassEffect>

      <AnimatedText tag="span">{label}</AnimatedText>
    </Link>
  );
}
