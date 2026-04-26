"use client";

import css from "./MessageNoStories.module.css";
import AppLink from "../AppLink/AppLink";
import Button from "../Button/Button";

interface Props {
  text: string;
  buttonText: string;
  linkTo?: string;
  onClick?: () => void;
}

export default function MessageNoStories({
  text,
  buttonText,
  linkTo,
  onClick,
}: Props) {
  return (
    <div className={css.wrapper}>
      <p className={css.text}>{text}</p>
      {onClick ? (
        <Button onClick={onClick} className={css.btn} type="button">
          {buttonText}
        </Button>
      ) : (
        <AppLink href={linkTo || "/"} className={css.btn} variant="mantis">
          {buttonText}
        </AppLink>
      )}
    </div>
  );
}
