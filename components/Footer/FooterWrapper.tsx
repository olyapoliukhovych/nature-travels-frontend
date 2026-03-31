"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // const hideOnPaths = ["/auth/login", "/auth/register"];
  const hideOnPaths = ["/login", "/register"];

  if (hideOnPaths.includes(pathname)) {
    return null;
  }

  return <Footer />;
}
