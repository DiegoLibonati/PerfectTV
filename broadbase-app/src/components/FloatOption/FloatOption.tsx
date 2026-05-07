import type { JSX } from "react";
import type { FloatOptionProps } from "@/types/props";

import ButtonFilled from "@/components/ButtonFilled/ButtonFilled";

import { useTheme } from "@/hooks/useTheme";

const FloatOption = ({ ariaLabel, children, onClick }: FloatOptionProps): JSX.Element => {
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

export default FloatOption;
