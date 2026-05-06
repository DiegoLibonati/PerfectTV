import type { JSX } from "react";

import SideBar from "@/components/SideBar/SideBar";
import FormSettings from "@/components/FormSettings/FormSettings";
import ButtonFilled from "@/components/ButtonFilled/ButtonFilled";

import { useTheme } from "@/hooks/useTheme";
import { useClientContext } from "@/hooks/useClientContext";

import { languageTexts } from "@/constants/languages";

const SideBarSettings = (): JSX.Element => {
  const { bg, bgOut, colorOut } = useTheme();

  const { language, sideBar, handleSetSideBar } = useClientContext();

  const handleCloseSettings = (): void => {
    handleSetSideBar(false);
  };

  return (
    <SideBar isOpen={sideBar} title={languageTexts[language].settings.title} className={bg}>
      <FormSettings></FormSettings>
      <ButtonFilled
        className={`${bgOut} ${colorOut}`}
        ariaLabel="close sidebar settings"
        type="button"
        onClick={handleCloseSettings}
      >
        {languageTexts[language].settings.close}
      </ButtonFilled>
    </SideBar>
  );
};

export default SideBarSettings;
