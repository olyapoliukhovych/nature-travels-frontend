import css from "./AuthHeader.module.css";
import { Icon } from "../Icon/Icon";
import Link from "next/link";
export default function AuthHeader() {
  return (
    <div className={css.authHeaderWrapper}>
      <Link
        className={css.authHeaderLogo}
        href="/"
        aria-label="На головну сторінку"
      >
        <Icon id="icon-logo" className={css.authHeaderSvg} />
      </Link>
    </div>
  );
}
