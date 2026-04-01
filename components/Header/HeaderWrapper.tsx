"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  const hideOnPaths = ["/auth/login", "/auth/register"];

  if (hideOnPaths.includes(pathname)) {
    return null;
  }

  return <Header />;
}
