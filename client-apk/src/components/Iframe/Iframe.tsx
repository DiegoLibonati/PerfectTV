import { IframeProps } from "@src/entities/props";

export const Iframe = ({
  url,
  sizes,
  allow,
  title,
  className,
}: IframeProps) => {
  const { height, width } = sizes;

  return (
    <iframe
      allow={allow}
      src={url}
      title={title}
      height={height}
      width={width}
      className={className}
    ></iframe>
  );
};
