import Link from "next/link";
import clsx from "clsx";
import styles from "./AppLink.module.css";

interface AppLinkProps {
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
}: AppLinkProps) {
  return (
    <Link
      href={disabled ? "#" : href}
      aria-disabled={disabled}
      className={clsx(
        styles.link,
        variant && styles[variant],
        disabled && styles.disabled,
        className,
      )}
    >
      {children}
    </Link>
  );
}
