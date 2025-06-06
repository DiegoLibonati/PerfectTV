import { ButtonFilledProps } from "@src/entities/props";

export const ButtonFilled = ({
  ariaLabel,
  className,
  children,
  type,
  onClick,
}: ButtonFilledProps) => {
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
