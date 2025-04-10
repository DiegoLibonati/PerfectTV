import { CiSettings } from "react-icons/ci";
import { IoReload } from "react-icons/io5";

import { FloatOptionsProps } from "@/src/entities/props";

import { ButtonFilled } from "@/src/components/ButtonFilled/ButtonFilled";

import { useClientContext } from "@/src/contexts/Client/ClientProvider";

import { useTheme } from "@/src/hooks/useTheme";
import { useWindow } from "@/src/hooks/useWindow";

export const FloatOptions = ({ children }: FloatOptionsProps) => {
  const { bg, bgOut, color } = useTheme();
  const { handleReloadWindow } = useWindow();

  const { handleSetSideBar } = useClientContext();

  const handleOpenSettings = () => {
    handleSetSideBar({ open: true });
  };

  const handleReloadPage = () => {
    handleReloadWindow();
  };

  return (
    <div
      className={`absolute top-2 right-8 flex flex-col items-start gap-2 w-14 h-auto p-2 rounded-lg opacity-0 transition-all hover:opacity-100 ${bgOut} float-options`}
    >
      <ButtonFilled
        type="button"
        ariaLabel="open settings"
        className={`flex flex-items-center justify-center w-full p-2 cursor-pointer rounded-lg ${bg} ${color}`}
        onClick={handleOpenSettings}
      >
        <CiSettings className={`text-xl`}></CiSettings>
      </ButtonFilled>

      <ButtonFilled
        type="button"
        ariaLabel="reload page"
        className={`flex flex-items-center justify-center w-full p-2 cursor-pointer rounded-lg ${bg} ${color}`}
        onClick={handleReloadPage}
      >
        <IoReload className={`text-xl`}></IoReload>
      </ButtonFilled>

      {children}
    </div>
  );
};
