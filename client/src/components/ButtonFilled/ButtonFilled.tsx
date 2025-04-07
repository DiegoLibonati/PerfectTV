import { ButtonFilledProps } from "@/src/entities/props";

import { useTheme } from "@/src/hooks/useTheme";

export const ButtonFilled = ({
  ariaLabel,
  className,
  children,
  type,
  onClick,
}: ButtonFilledProps) => {
  const { bgOut, colorOut } = useTheme();

  return (
    <button
      className={`text-lg font-medium p-2 cursor-pointer transition-all active:scale-95 hover:bg-opacity-75 ${bgOut} ${colorOut} ${className}`}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
