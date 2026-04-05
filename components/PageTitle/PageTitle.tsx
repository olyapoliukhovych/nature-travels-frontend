import { ReactNode } from "react";
import clsx from "clsx";
import css from "./PageTitle.module.css";

type TitleTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
type TextAlign = "left" | "center" | "right";

interface Props {
  children: ReactNode;
  tag?: TitleTag;
  align?: TextAlign;
  className?: string;
}

export default function PageTitle({
  children,
  tag: Tag = "h1",
  align = "left",
  className,
}: Props) {
  return (
    <Tag className={clsx(css.title, css[align], className)}>{children}</Tag>
  );
}
