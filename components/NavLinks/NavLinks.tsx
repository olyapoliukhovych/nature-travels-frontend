"use client";

import Link from "next/link";
import styles from "./NavLinks.module.css";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Props = {
  isAuth: boolean;
  onLinkClick?: () => void;
};

const navLinks = [
  { name: "Головна", href: "/" },
  { name: "Статті", href: "/stories" },
  { name: "Еко-Мандрівники", href: "/travellers" },
];

export default function NavLinks({ isAuth, onLinkClick }: Props) {
  const pathname = usePathname();

  const getIsActive = (href: string) => {
    if (href === "/stories") {
      return pathname === "/stories";
    }

    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <nav className={styles.nav} aria-label="Основна навігація">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className={clsx(styles.link, getIsActive(link.href) && styles.active)}
        >
          {link.name}
        </Link>
      ))}

      {isAuth && (
        <Link
          href="/profile"
          onClick={onLinkClick}
          className={clsx(
            styles.link,
            getIsActive("/profile") && styles.active,
          )}
        >
          Мій профіль
        </Link>
      )}
    </nav>
  );
}
