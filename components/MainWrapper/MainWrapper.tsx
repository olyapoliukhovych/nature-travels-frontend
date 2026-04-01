"use client";

import { usePathname } from "next/navigation";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/auth/register" || pathname === "/auth/login";

  return <main className={isAuthPage ? "" : "container"}>{children}</main>;
}
