import { ParagraphProps } from "@/src/entities/props";

import { useTheme } from "@/src/hooks/useTheme";

export const Paragraph = ({ className, children }: ParagraphProps) => {
  const { color } = useTheme();

  return <p className={`text-sm ${color} ${className}`}>{children}</p>;
};
