import { Heading2 } from "@/src/components/Heading2/Heading2";
import { CatSvg } from "@/src/components/Svgs/CatSvg/CatSvg";

import { languageTexts } from "@/src/constants/languageTexts";

import { useClientContext } from "@/src/contexts/Client/ClientProvider";

import { useTheme } from "@/src/hooks/useTheme";

export const NotChannelsSection = () => {
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
