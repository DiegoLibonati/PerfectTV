import { SeparatorTextProps } from "@/src/entities/props";

import { useTheme } from "@/src/hooks/useTheme";

export const SeparatorText = ({ className }: SeparatorTextProps) => {
  const { border } = useTheme();

  return (
    <hr
      className={`block h-1 border-0 border-t-[.2rem] p-0 ${border} ${className}`}
    ></hr>
  );
};
