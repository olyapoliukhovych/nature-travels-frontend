"use client";

import Link from "next/link";
import clsx from "clsx";
import styles from "./AppLink.module.css";
import { AnchorHTMLAttributes } from "react";

interface AppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "mantis" | "neutral" | "base";
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
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
      {children}
    </Link>
  );
}
