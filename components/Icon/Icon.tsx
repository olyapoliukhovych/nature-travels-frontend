interface IconProps {
  id: string;
  className?: string;
  width?: number;
  height?: number;
}

export const Icon = ({ id, className, width, height }: IconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
    >
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};
