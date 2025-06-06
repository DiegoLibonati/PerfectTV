import { IoReload } from "react-icons/io5";

import { FloatOptionsProps } from "@src/entities/props";

import { FloatOption } from "@src/components/FloatOption/FloatOption";

import { useTheme } from "@src/hooks/useTheme";
import { useWindow } from "@src/hooks/useWindow";

export const FloatOptions = ({ children }: FloatOptionsProps) => {
  const { bgOut } = useTheme();
  const { handleReloadWindow } = useWindow();

  const handleReloadPage = () => {
    handleReloadWindow();
  };

  return (
    <div
      className={`absolute top-2 right-8 flex flex-col items-start gap-2 w-14 h-auto p-2 rounded-lg opacity-0 transition-all hover:opacity-100 ${bgOut} float-options`}
    >
      <FloatOption onClick={handleReloadPage} ariaLabel="reload page">
        <IoReload className={`text-xl`}></IoReload>
      </FloatOption>

      {children}
    </div>
  );
};
