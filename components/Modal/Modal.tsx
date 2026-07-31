import { useEffect, type ReactNode } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import FocusLock from "react-focus-lock";
import { Icon } from "../Icon/Icon";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: Props) {
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const prevOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleEscKey);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = "";
    };
  }, [onClose]);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return createPortal(
    <FocusLock returnFocus>
      <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={onClose}
      >
        <div className={css.modal} onClick={handleModalClick}>
          <button
            className={css.closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Закрити модальне вікно"
          >
            <Icon id="icon-close" className={css.iconClose} />
          </button>
          {children}
        </div>
      </div>
    </FocusLock>,
    document.body,
  );
}
