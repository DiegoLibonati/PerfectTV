import type { JSX } from "react";

import Heading2 from "@/components/Heading2/Heading2";
import CatSvg from "@/components/Svgs/CatSvg/CatSvg";

import { useClientContext } from "@/hooks/useClientContext";
import { useTheme } from "@/hooks/useTheme";

import { languageTexts } from "@/constants/languages";

const NotActiveChannelSection = (): JSX.Element => {
  const { language } = useClientContext();
  const { color } = useTheme();

  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <CatSvg className="h-64 w-64"></CatSvg>
      <Heading2 className={`text-center -mt-16 ${color}`}>
        {languageTexts[language].channel.noActive}
      </Heading2>
    </section>
  );
};

export default NotActiveChannelSection;
