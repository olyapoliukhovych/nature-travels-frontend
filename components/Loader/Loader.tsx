import css from "./Loader.module.css";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Loader({ className, size = "md" }: LoaderProps) {
  return (
    <div className={`${css.container} ${className || ""}`}>
      <div className={`${css.spinner} ${css[size]}`}></div>
    </div>
  );
}
