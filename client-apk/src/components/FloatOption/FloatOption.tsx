import { FloatOptionProps } from "@src/entities/props";

import { ButtonFilled } from "@src/components/ButtonFilled/ButtonFilled";

import { useTheme } from "@src/hooks/useTheme";

export const FloatOption = ({
  ariaLabel,
  children,
  onClick,
}: FloatOptionProps) => {
  const { bg, color } = useTheme();

  return (
    <ButtonFilled
      type="button"
      ariaLabel={ariaLabel}
      className={`flex flex-items-center justify-center w-full p-2 cursor-pointer rounded-lg ${bg} ${color}`}
      onClick={onClick}
    >
      {children}
    </ButtonFilled>
  );
};
