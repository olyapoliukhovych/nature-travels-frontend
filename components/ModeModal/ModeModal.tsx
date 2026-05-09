import { Icon } from "../Icon/Icon";
import css from "./ModeModal.module.css";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import Button from "../Button/Button";
import AnimatedText from "../AnimatedText/AnimatedText";
import AppLink from "../AppLink/AppLink";

interface Props {
  mode: "save" | "logout" | "deleteStory" | "deleteProfile";
  onClose: () => void;
  logout?: () => void;
  onDelete?: () => void;
}

export function ModeModal({ mode, onClose, logout, onDelete }: Props) {
  const { setRedirect } = useAuthRedirect();

  const content = {
    save: {
      title: "Помилка під час збереження",
      text: "Щоб зберегти статтю, вам треба увійти. Якщо ще немає облікового запису, зареєструйтесь.",
    },
    logout: {
      title: "Ви точно хочете вийти?",
      text: "Ми будемо сумувати за вами!",
      confirmLabel: "Вийти",
      action: logout,
    },
    deleteStory: {
      title: "Видалити історію?",
      text: "Цю дію неможливо буде скасувати.",
      confirmLabel: "Видалити",
      action: onDelete,
    },
    deleteProfile: {
      title: "Видалити профіль?",
      text: "Усі ваші дані будуть видалені.",
      confirmLabel: "Видалити",
      action: onDelete,
    },
  }[mode];

  return (
    <>
      <button className={css.closeBtn} type="button" onClick={onClose}>
        <Icon id="icon-close" className={css.iconClose} />
      </button>

      <AnimatedText tag="h2" align="center" className={css.titleModal}>
        {content.title}
      </AnimatedText>
      <AnimatedText tag="p" align="center" className={css.textModal}>
        {content.text}
      </AnimatedText>

      <div className={css.navigationWrapper}>
        {mode === "save" ? (
          <>
            <AppLink
              className={css.loginLink}
              onClick={setRedirect}
              href="/auth/login"
            >
              Увійти
            </AppLink>
            <AppLink
              className={css.registerLink}
              onClick={setRedirect}
              href="/auth/register"
            >
              Зареєструватись
            </AppLink>
          </>
        ) : (
          <>
            <Button
              className={css.cancelBtn}
              onClick={onClose}
              variant="neutral"
            >
              Відмінити
            </Button>
            <Button
              className={mode === "logout" ? css.logoutBtn : css.deleteBtn}
              onClick={"action" in content ? content.action : undefined}
            >
              {"confirmLabel" in content ? content.confirmLabel : ""}
            </Button>
          </>
        )}
      </div>
    </>
  );
}
