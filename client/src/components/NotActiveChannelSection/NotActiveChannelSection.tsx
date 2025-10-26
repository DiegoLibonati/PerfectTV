import { Heading2 } from "@src/components/Heading2/Heading2";
import { CatSvg } from "@src/components/Svgs/CatSvg/CatSvg";

import { useClientContext } from "@src/hooks/useClientContext";
import { useTheme } from "@src/hooks/useTheme";

import { languageTexts } from "@src/constants/languageTexts";

export const NotActiveChannelSection = () => {
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
