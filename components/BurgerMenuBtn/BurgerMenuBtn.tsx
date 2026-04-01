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
      <svg className={styles.icon} width="32" height="32" aria-hidden="true">
        <use href={`/sprite.svg#${isOpen ? "icon-close" : "icon-menu"}`} />
      </svg>
    </button>
  );
}
