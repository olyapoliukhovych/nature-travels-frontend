"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
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
    <div className={"layoutWrapper"}>
      <Header />
      <main className={"mainContent"}>{children}</main>
      <Footer />
    </div>
  );
}
