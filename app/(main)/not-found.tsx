"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import css from "@/app/(main)/NotFound.module.css";
import AppLink from "@/components/AppLink/AppLink";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>404 | Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p className={css.description}>
        You will be redirected to the home page in 5 seconds.
      </p>
      <AppLink className={css.link} href={"/"} variant={"mantis"}>
        Go back home
      </AppLink>
    </div>
  );
}
