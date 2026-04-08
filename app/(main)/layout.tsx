"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import css from "./Mainlayout.module.css";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className={css.layoutWrapper}>
      <Header />
      <main className={clsx(css.mainContent)}>{children}</main>
      <Footer />
    </div>
  );
}
