import { SideBar } from "@/src/components/SideBar/SideBar";
import { FormSettings } from "@/src/components/FormSettings/FormSettings";
import { ButtonFilled } from "@/src/components/ButtonFilled/ButtonFilled";

import { useClientContext } from "@/src/contexts/Client/ClientProvider";

import { languageTexts } from "@/src/constants/languageTexts";

export const SideBarSettings = () => {
  const { language, sideBar, handleSetSideBar } = useClientContext();

  const handleCloseSettings = () => {
    handleSetSideBar({ open: false });
  };

  return (
    <SideBar
      isOpen={sideBar.open}
      title={languageTexts[language].settings.title}
    >
      <FormSettings></FormSettings>
      <ButtonFilled
        ariaLabel="close sidebar settings"
        type="button"
        onClick={handleCloseSettings}
      >
        {languageTexts[language].settings.close}
      </ButtonFilled>
    </SideBar>
  );
};
