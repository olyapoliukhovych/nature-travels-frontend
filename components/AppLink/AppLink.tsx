"use client";

import Link, { LinkProps } from "next/link";
import clsx from "clsx";
import styles from "./AppLink.module.css";
import { AnchorHTMLAttributes } from "react";
import GrassEffect from "../GrassEffect/GrassEffect";

interface AppLinkProps
  extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  variant?: "mantis" | "neutral" | "base";
  disabled?: boolean;
  children: string;
}

export default function AppLink({
  href,
  variant,
  disabled,
  children,
  className,
  ...rest
}: AppLinkProps) {
  return (
    <Link
      href={disabled ? "#" : href}
      onClick={(e) => {
        if (disabled) e.preventDefault();
      }}
      aria-disabled={disabled}
      className={clsx(
        styles.link,
        variant && styles[variant],
        disabled && styles.disabled,
        className,
      )}
      {...rest}
    >
      <GrassEffect>{children}</GrassEffect>
    </Link>
  );
}
