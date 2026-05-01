import clsx from "clsx";
import css from "./Button.module.css";

type ButtonVariant = "mantis" | "neutral";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  loadingText?: string;
  hideSpinner?: boolean;
}

export default function Button({
  children,
  isLoading,
  variant = "mantis",
  disabled,
  loadingText,
  hideSpinner,
  className,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(css.button, css[variant], className)}
      disabled={isLoading || disabled}
      aria-busy={isLoading}
      style={{
        ...style,
      }}
      {...props}
    >
      {isLoading ? (
        <span className={css.loaderWrapper} aria-live="polite">
          {!hideSpinner && <span className={css.spinner}></span>}
          {loadingText?.trim() && (
            <span>
              {loadingText.trim()}
              <span className={css.dot} style={{ animationDelay: "0s" }}>
                .
              </span>
              <span className={css.dot} style={{ animationDelay: "0.2s" }}>
                .
              </span>
              <span className={css.dot} style={{ animationDelay: "0.4s" }}>
                .
              </span>
            </span>
          )}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
