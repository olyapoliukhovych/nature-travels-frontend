import css from "./SocialList.module.css";
export default function SocialList() {
  return (
    <>
      <div className={css.socialListWrapper}>
        <a className={css.socialListLink} href="https://www.facebook.com">
          <svg className={css.socialListSvg}>
            <use href="/sprite.svg#icon-facebook"></use>
          </svg>
        </a>
        <a className={css.socialListLink} href="https://www.instagram.com">
          <svg className={css.socialListSvg}>
            <use href="/sprite.svg#icon-instagram"></use>
          </svg>
        </a>
        <a className={css.socialListLink} href="https://www.x.com">
          <svg className={css.socialListSvg}>
            <use href="/sprite.svg#icon-x"></use>
          </svg>
        </a>
        <a className={css.socialListLink} href="https://www.youtube.com">
          <svg className={css.socialListSvg}>
            <use href="/sprite.svg#icon-youtube"></use>
          </svg>
        </a>
      </div>
    </>
  );
}
