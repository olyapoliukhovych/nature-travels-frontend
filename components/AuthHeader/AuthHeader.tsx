import css from "./AuthHeader.module.css";
import { Icon } from "../Icon/Icon";
import Link from "next/link";
export default function AuthHeader() {
  return (
    <header className={css.authHeaderWrapper}>
      <div className="container">
        <Link
          className={css.authHeaderLogo}
          href="/"
          aria-label="На головну сторінку"
        >
          <Icon id="icon-logo" className={css.authHeaderSvg} />
        </Link>
      </div>
    </header>
  );
}
