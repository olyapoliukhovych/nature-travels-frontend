import css from "./AuthHeader.module.css";

export default function AuthHeader() {
  return (
    <a href="/">
      <svg className={css.authHeaderSvg} width="121" height="35">
        <use href="/sprite.svg#icon-logo"></use>
      </svg>
    </a>
  );
}
