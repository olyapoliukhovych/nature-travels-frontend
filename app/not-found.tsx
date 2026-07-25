"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import css from "@/app/NotFound.module.css";
import clsx from "clsx";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function NotFound() {
  const [seconds, setSeconds] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    if (seconds === 0) {
      router.push("/");
    }

    return () => clearInterval(timer);
  }, [seconds, router]);

  return (
    <div className={"layoutWrapper"}>
      <Header />
      <main className={clsx(css.section, "mainContent")}>
        <div className={"container"}>
          <h2 className={css.title}>404 | Page Not Found</h2>
          <p className={css.description}>
            Sorry, the page you are looking for does not exist.
          </p>
          <p className={css.description}>
            You will be redirected to the home page in
            <span className={css.timer}> {seconds} </span>seconds...
          </p>
          <Link className={css.link} href="/">
            Go back home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
