interface IconProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Icon = ({ id, className, style }: IconProps) => {
  return (
    <svg className={className} style={style}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};
