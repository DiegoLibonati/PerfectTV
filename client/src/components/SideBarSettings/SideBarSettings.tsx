import { SideBar } from "@src/components/SideBar/SideBar";
import { FormSettings } from "@src/components/FormSettings/FormSettings";
import { ButtonFilled } from "@src/components/ButtonFilled/ButtonFilled";

import { useTheme } from "@src/hooks/useTheme";
import { useClientContext } from "@src/hooks/useClientContext";

import { languageTexts } from "@src/constants/languageTexts";

export const SideBarSettings = () => {
  const { bg, bgOut, colorOut } = useTheme();

  const { language, sideBar, handleSetSideBar } = useClientContext();

  const handleCloseSettings = () => {
    handleSetSideBar({ open: false });
  };

  return (
    <SideBar
      isOpen={sideBar.open}
      title={languageTexts[language].settings.title}
      className={`${bg}`}
    >
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
