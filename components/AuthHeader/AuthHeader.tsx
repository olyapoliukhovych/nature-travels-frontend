import css from "./AuthHeader.module.css";
import Logo from "../Logo/Logo";
export default function AuthHeader() {
  return (
    <header className={css.authHeaderWrapper}>
      <div className="container">
        <Logo />
      </div>
    </header>
  );
}
