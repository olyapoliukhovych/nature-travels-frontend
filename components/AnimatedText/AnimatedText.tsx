import clsx from "clsx";
import css from "./AnimatedText.module.css";
import GrassEffect from "../GrassEffect/GrassEffect";

type TitleTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "label";
type TextAlign = "left" | "center" | "right";

interface Props {
  children: string;
  tag?: TitleTag;
  align?: TextAlign;
  className?: string;
  htmlFor?: string;
}

export default function AnimatedText({
  children,
  tag: Tag = "h1",
  align = "left",
  className,
  htmlFor,
}: Props) {
  const tagProps = Tag === "label" ? { htmlFor } : {};

  return (
    <Tag {...tagProps} className={clsx(css[align], className)}>
      <GrassEffect>{children}</GrassEffect>
    </Tag>
  );
}
