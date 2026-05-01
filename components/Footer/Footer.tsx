import css from "./Footer.module.css";
import Copyright from "./Copyright";
import SocialList from "./SocialList/SocialList";
import FooterNav from "./FooterNav/FooterNav";
import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.footerWrapper}>
          <Logo />
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
