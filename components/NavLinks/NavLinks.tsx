"use client";

import Link from "next/link";
import styles from "./NavLinks.module.css";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuthStore } from "@/lib/store/authStore";

interface Props {
  onClick?: () => void;
}

const navLinks = [
  { name: "Головна", href: "/" },
  { name: "Статті", href: "/stories" },
  { name: "Еко-Мандрівники", href: "/travellers" },
];

export default function NavLinks({ onClick }: Props) {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const getIsActive = (href: string) => {
    if (href === "/stories") {
      return pathname === "/stories";
    }

    if (href === "/travellers") {
      return pathname === "/travellers";
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
          onClick={onClick}
          className={clsx(styles.link, getIsActive(link.href) && styles.active)}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
