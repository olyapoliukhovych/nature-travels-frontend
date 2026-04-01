import css from "./Footer.module.css";
import Copyright from "./Copyright";
import SocialList from "./SocialList/SocialList";
import FooterNav from "./FooterNav/FooterNav";
import AppLink from "../AppLink/AppLink";
import { Icon } from "../Icon/Icon";

export default function Footer() {
  return (
      <footer className={css.footer}>
        <div className="container">
          <div className={css.footerWrapper}>
            <AppLink
              className={css.footerLogo}
              href="/"
              aria-label="На головну сторінку"
            >
              <Icon
                id="icon-logo"
                width={121}
                height={35}
                className={css.footerSvg}
              />
            </AppLink>
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
