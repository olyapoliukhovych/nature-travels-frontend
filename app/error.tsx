"use client";

import Button from "@/components/Button/Button";
import css from "./Error.module.css";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div className={css.errorWrapper}>
      <h2 className={css.title}>Error</h2>
      <p className={css.description}>{error.message}</p>
      <Button className={css.btn} onClick={reset} variant={"neutral"}>
        Try again
      </Button>
    </div>
  );
};

export default Error;
