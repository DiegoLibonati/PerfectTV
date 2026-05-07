import type { JSX } from "react";
import type { ParagraphProps } from "@/types/props";

const Paragraph = ({ className, children }: ParagraphProps): JSX.Element => {
  return <p className={`text-sm ${className}`}>{children}</p>;
};

export default Paragraph;
