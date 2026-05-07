import type { JSX } from "react";

import Heading2 from "@/components/Heading2/Heading2";
import CatSvg from "@/components/Svgs/CatSvg/CatSvg";

import { useTheme } from "@/hooks/useTheme";
import { useClientContext } from "@/hooks/useClientContext";

import { languageTexts } from "@/constants/languages";

const NotChannelsSection = (): JSX.Element => {
  const { language } = useClientContext();
  const { color } = useTheme();

  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <CatSvg className="h-64 w-64"></CatSvg>
      <Heading2 className={`text-center -mt-16 ${color}`}>
        {languageTexts[language].channels.notChannels}
      </Heading2>
    </section>
  );
};

export default NotChannelsSection;
