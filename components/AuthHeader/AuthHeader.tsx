import css from "./AuthHeader.module.css";
import AppLink from "@/components/AppLink/AppLink";
import { Icon } from "../Icon/Icon";
export default function AuthHeader() {
  return (
    <AppLink className={css.authHeaderLogo} href="/">
      <Icon
        id="icon-logo"
        width={121}
        height={35}
        className={css.authHeaderSvg}
      />
    </AppLink>
  );
}
