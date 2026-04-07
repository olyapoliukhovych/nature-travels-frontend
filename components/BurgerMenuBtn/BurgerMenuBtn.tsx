import { Icon } from "../Icon/Icon";
import styles from "./BurgerMenuBtn.module.css";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function BurgerMenuBtn({ isOpen, setIsOpen }: Props) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => setIsOpen(!isOpen)}
      aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <Icon
        id={`${isOpen ? "icon-close" : "icon-menu"}`}
        className={styles.icon}
      />
    </button>
  );
}
