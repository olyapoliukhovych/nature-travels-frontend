import css from "./Footer.module.css";
import Copyright from "./Copyright";
import SocialList from "./SocialList/SocialList";
import FooterNav from "./FooterNav/FooterNav";

export default function Footer() {
  return (
    <>
      <footer className={css.footer}>
        <div className="container">
          <div className={css.footerWrapper}>
            <a href="/">
              <svg width="121" height="35">
                <use href="/sprite.svg#icon-logo"></use>
              </svg>
            </a>
            <SocialList />
            <FooterNav />
          </div>

          <hr className={css.footerLine} />

          <div className={css.copyrightWrapper}>
            <Copyright />
          </div>
        </div>
      </footer>
    </>
  );
}
