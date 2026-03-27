import clsx from "clsx";
import css from "./Button.module.css";

type ButtonVariant = "mantis" | "neutral";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  loadingText?: string;
}

export default function Button({
  children,
  isLoading,
  variant = "mantis",
  disabled,
  loadingText,
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
          <span className={css.spinner}></span>
          {loadingText?.trim() && <span>{loadingText.trim()}....</span>}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
