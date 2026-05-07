import type { JSX } from "react";
import type { IframeProps } from "@/types/props";

const Iframe = ({ url, sizes, allow, title, className }: IframeProps): JSX.Element => {
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

export default Iframe;
