"use client";

import { usePathname } from "next/navigation";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideOnPaths = ["/auth/login", "/auth/register"];
  const isAuthPage = hideOnPaths.includes(pathname);

  return <main className={isAuthPage ? "" : "container"}>{children}</main>;
}
