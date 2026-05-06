import { CiSettings } from "react-icons/ci";
import { IoReload } from "react-icons/io5";

import type { JSX } from "react";
import type { FloatOptionsProps } from "@/types/props";

import FloatOption from "@/components/FloatOption/FloatOption";

import { useClientContext } from "@/hooks/useClientContext";

import { useTheme } from "@/hooks/useTheme";
import { useWindow } from "@/hooks/useWindow";

const FloatOptions = ({ children }: FloatOptionsProps): JSX.Element => {
  const { bgOut } = useTheme();
  const { handleReloadWindow } = useWindow();

  const { handleSetSideBar } = useClientContext();

  const handleOpenSettings = (): void => {
    handleSetSideBar({ open: true });
  };

  const handleReloadPage = (): void => {
    handleReloadWindow();
  };

  return (
    <div
      className={`absolute top-2 right-8 flex flex-col items-start gap-2 w-14 h-auto p-2 rounded-lg opacity-0 transition-all hover:opacity-100 ${bgOut} float-options`}
    >
      <FloatOption onClick={handleOpenSettings} ariaLabel="open settings">
        <CiSettings className={`text-xl`}></CiSettings>
      </FloatOption>

      <FloatOption onClick={handleReloadPage} ariaLabel="reload page">
        <IoReload className={`text-xl`}></IoReload>
      </FloatOption>

      {children}
    </div>
  );
};

export default FloatOptions;
