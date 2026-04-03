"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import css from "@/app/NotFound.module.css";
import AppLink from "@/components/AppLink/AppLink";

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
    <div className={css.container}>
      <h2 className={css.title}>404 | Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p className={css.description}>
        You will be redirected to the home page in
        <span className={css.timer}> {seconds} </span>seconds...
      </p>
      <AppLink className={css.link} href={"/"} variant={"mantis"}>
        Go back home
      </AppLink>
    </div>
  );
}
