"use client";

import Link, { LinkProps } from "next/link";
import clsx from "clsx";
import styles from "./AppLink.module.css";
import { AnchorHTMLAttributes, ReactNode } from "react";

interface Props
  extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  variant?: "mantis" | "neutral" | "base";
  disabled?: boolean;
  children: ReactNode;
}

export default function AppLink({
  href,
  variant,
  disabled,
  children,
  className,
  ...rest
}: Props) {
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
      {children}
    </Link>
  );
}
