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

//!PROPS TO NO Stories
/* 
<MessageNoStories text = "Ви ще нічого не публікували, поділіться своєю першою історією"
  buttonText = "Опублікувати історію" 
  linkTo="/stories/new"/>
*/

/* <MessageNoStories
  text="У вас ще немає збережених історій, спершу збережіть вашу першу історію!"
  buttonText="До історій"
  linkTo="/stories"
/>*/

/* <MessageNoStories
  text="Цей користувач ще не публікував історій"
  buttonText="Назад до історій"
  linkTo="/stories"
/>*/
