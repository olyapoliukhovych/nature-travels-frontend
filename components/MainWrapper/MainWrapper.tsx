"use client";

import { usePathname } from "next/navigation";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/register" || pathname === "/login";

  return <main className={isAuthPage ? "" : "container"}>{children}</main>;
}
