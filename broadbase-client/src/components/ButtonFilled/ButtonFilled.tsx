import type { JSX } from "react";
import type { ButtonFilledProps } from "@/types/props";

const ButtonFilled = ({
  ariaLabel,
  className,
  children,
  type,
  onClick,
}: ButtonFilledProps): JSX.Element => {
  return (
    <button
      className={`text-lg font-medium p-2 cursor-pointer transition-all active:scale-95 hover:bg-opacity-75 ${className}`}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default ButtonFilled;
