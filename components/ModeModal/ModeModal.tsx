import { Icon } from "../Icon/Icon";
import css from "./ModeModal.module.css";
import Link from "next/link";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

interface Props {
  mode: "save" | "logout";
  onClose: () => void;
  logout?: () => void;
}

export function ModeModal({ mode, onClose, logout }: Props) {
  const { setRedirect } = useAuthRedirect();
  const variant = mode === "save";

  return (
    <>
      <button className={css.closeBtn} type="button" onClick={onClose}>
        <Icon id="icon-close" className={css.iconClose} />
      </button>
      <h2 className={css.titleModal}>
        {variant ? "Помилка під час збереження" : "Ви точно хочете вийти?"}
      </h2>
      <p className={css.textModal}>
        {variant
          ? "Щоб зберегти статтю, вам треба увійти. Якщо ще немає облікового запису, зареєструйтесь"
          : "Ми будемо сумувати за вами!"}
      </p>
      <div className={css.navigationWrapper}>
        {variant ? (
          <>
            <Link
              className={css.loginLink}
              onClick={setRedirect}
              href="/auth/login"
            >
              Увійти
            </Link>
            <Link
              className={css.registerLink}
              onClick={setRedirect}
              href="/auth/register"
            >
              Зареєструватись
            </Link>
          </>
        ) : (
          <>
            <button className={css.cancelBtn} onClick={onClose}>
              Відмінити
            </button>
            <button className={css.logoutBtn} onClick={logout}>
              Вийти
            </button>
          </>
        )}
      </div>
    </>
  );
}
