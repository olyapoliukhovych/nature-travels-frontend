import css from "./AuthBar.module.css";
import AppLink from "../AppLink/AppLink";
import clsx from "clsx";

interface Props {
  direction?: "row" | "column";
  onClick?: () => void;
}

export default function AuthBar({ direction = "row", onClick }: Props) {
  return (
    <div className={clsx(css.wrapper, css[direction])}>
      <AppLink
        href="/auth/login"
        variant="neutral"
        className={css.link}
        onClick={onClick}
      >
        Вхід
      </AppLink>
      <AppLink
        href="/auth/register"
        variant="mantis"
        className={css.link}
        onClick={onClick}
      >
        Реєстрація
      </AppLink>
    </div>
  );
}
