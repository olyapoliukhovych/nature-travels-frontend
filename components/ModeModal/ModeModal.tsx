import { Icon } from "../Icon/Icon";
import css from "./ModeModal.module.css";
import Link from "next/link";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

interface Props {
  mode: "save" | "logout" | "delete";
  onClose: () => void;
  logout?: () => void;
  onDelete?: () => void;
}

export function ModeModal({ mode, onClose, logout, onDelete }: Props) {
  const { setRedirect } = useAuthRedirect();

  const getContent = () => {
    switch (mode) {
      case "save":
        return {
          title: "Помилка під час збереження",
          text: "Щоб зберегти статтю, вам треба увійти. Якщо ще немає облікового запису, зареєструйтесь.",
        };
      case "logout":
        return {
          title: "Ви точно хочете вийти?",
          text: "Ми будемо сумувати за вами!",
        };
      case "delete":
        return {
          title: "Видалити історію?",
          text: "Цю дію неможливо буде скасувати.",
        };
    }
  };

  const { title, text } = getContent();

  return (
    <>
      <button className={css.closeBtn} type="button" onClick={onClose}>
        <Icon id="icon-close" className={css.iconClose} />
      </button>
      <h2 className={css.titleModal}>{title}</h2>
      <p className={css.textModal}>{text}</p>

      <div className={css.navigationWrapper}>
        {mode === "save" && (
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
        )}

        {mode === "logout" && (
          <>
            <button className={css.cancelBtn} onClick={onClose}>
              Відмінити
            </button>
            <button className={css.logoutBtn} onClick={logout}>
              Вийти
            </button>
          </>
        )}

        {mode === "delete" && (
          <>
            <button className={css.cancelBtn} onClick={onClose}>
              Відмінити
            </button>
            <button className={css.deleteBtn} onClick={onDelete}>
              Видалити
            </button>
          </>
        )}
      </div>
    </>
  );
}
