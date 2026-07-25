import css from "./Footer.module.css";
import SocialList from "./SocialList/SocialList";
import Logo from "../Logo/Logo";
import NavLinks from "../NavLinks/NavLinks";
import Copyright from "./Copyright/Copyright";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.footerWrapper}>
          <Logo />
          <SocialList />
          <NavLinks />
        </div>

        <hr className={css.footerLine} />

        <div className={css.copyrightWrapper}>
          <Copyright />
        </div>
      </div>
    </footer>
  );
}
