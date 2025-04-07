import { CiSettings } from "react-icons/ci";

import { ButtonFilled } from "@/src/components/ButtonFilled/ButtonFilled";

import { useClientContext } from "@/src/contexts/Client/ClientProvider";

import { useTheme } from "@/src/hooks/useTheme";

export const FloatOptions = () => {
  const { bg } = useTheme();
  const { handleSetSideBar } = useClientContext();

  const handleOpenSettings = () => {
    handleSetSideBar({ open: true });
  };

  return (
    <div
      className={`absolute top-2 right-8 flex items-start gap-2 w-16 h-auto p-2 rounded-lg opacity-0 transition-all hover:opacity-100 ${bg}`}
    >
      <ButtonFilled
        type="button"
        ariaLabel="open settings"
        className={`flex flex-items-center justify-center w-full p-2 cursor-pointer rounded-lg`}
        onClick={handleOpenSettings}
      >
        <CiSettings className={`text-xl`}></CiSettings>
      </ButtonFilled>
    </div>
  );
};
