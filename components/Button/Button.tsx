import clsx from "clsx";
import css from "./Button.module.css";
import Loader from "../Loader/Loader";

type ButtonVariant = "mantis" | "neutral" | "custom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  children?: string;
}

export default function Button({
  children,
  icon,
  isLoading = false,
  loadingText,
  variant = "mantis",
  disabled = false,
  className,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  const textToShow = children?.trim();
  const isPureIconOnly = Boolean(icon && !textToShow);

  return (
    <button
      className={clsx(
        css.button,
        variant !== "custom" && css[variant],
        isLoading && css.loading,
        isPureIconOnly && css.iconOnly,
        className,
      )}
      disabled={isDisabled}
      aria-busy={isLoading}
      style={style}
      {...props}
    >
      <span className={css.contentWrapper}>
        {isLoading ? (
          <span className={css.loaderWrapper} aria-live="polite">
            {icon && <Loader size="sm" className={css.buttonLoader} />}
            {textToShow && (
              <span className={css.buttonText}>
                {loadingText || textToShow}
                <span className={css.dots} aria-hidden="true">
                  <span
                    className={css.dot}
                    style={{ "--delay": "0s" } as React.CSSProperties}
                  >
                    .
                  </span>
                  <span
                    className={css.dot}
                    style={{ "--delay": "0.2s" } as React.CSSProperties}
                  >
                    .
                  </span>
                  <span
                    className={css.dot}
                    style={{ "--delay": "0.4s" } as React.CSSProperties}
                  >
                    .
                  </span>
                </span>
              </span>
            )}
          </span>
        ) : (
          <>
            {icon && <span className={css.iconWrapper}>{icon}</span>}
            {textToShow && <span className={css.buttonText}>{textToShow}</span>}
          </>
        )}
      </span>
    </button>
  );
}
