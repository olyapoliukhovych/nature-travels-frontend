import css from "./Footer.module.css";
import Copyright from "./Copyright";
import SocialList from "./SocialList/SocialList";
import FooterNav from "./FooterNav/FooterNav";
import { Icon } from "../Icon/Icon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.footerWrapper}>
          <Link
            className={css.footerLogo}
            href="/"
            aria-label="На головну сторінку"
          >
            <Icon id="icon-logo" className={css.footerSvg} />
          </Link>
          <SocialList />
          <FooterNav />
        </div>

        <hr className={css.footerLine} />

        <div className={css.copyrightWrapper}>
          <Copyright />
        </div>
      </div>
    </footer>
  );
}
