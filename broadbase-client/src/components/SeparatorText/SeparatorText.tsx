import type { JSX } from "react";
import type { SeparatorTextProps } from "@/types/props";

const SeparatorText = ({ className }: SeparatorTextProps): JSX.Element => {
  return <hr className={`block h-1 border-0 border-t-[.2rem] p-0 ${className}`}></hr>;
};

export default SeparatorText;
