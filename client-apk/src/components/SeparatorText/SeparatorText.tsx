import { SeparatorTextProps } from "@src/entities/props";

export const SeparatorText = ({ className }: SeparatorTextProps) => {
  return (
    <hr className={`block h-1 border-0 border-t-[.2rem] p-0 ${className}`}></hr>
  );
};
