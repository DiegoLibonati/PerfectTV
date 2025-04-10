import { ParagraphProps } from "@/src/entities/props";

export const Paragraph = ({ className, children }: ParagraphProps) => {
  return <p className={`text-sm ${className}`}>{children}</p>;
};
