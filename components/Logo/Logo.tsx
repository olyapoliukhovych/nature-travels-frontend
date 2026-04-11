import Link from "next/link";
import { Icon } from "../Icon/Icon";
import css from "./Logo.module.css";

interface Props {
  onClick?: () => void;
}

export default function Logo({ onClick }: Props) {
  return (
    <Link href="/" aria-label="На головну сторінку" onClick={onClick}>
      <Icon id="icon-logo" className={css.logoIcon} />
    </Link>
  );
}
