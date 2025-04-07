import { CatSvg } from "@/src/components/Svgs/CatSvg/CatSvg";

import { languageTexts } from "@/src/constants/languageTexts";

import { useClientContext } from "@/src/contexts/Client/ClientProvider";

import { useTheme } from "@/src/hooks/useTheme";

export const NotActiveChannelSection = () => {
  const { language } = useClientContext();
  const { color } = useTheme();

  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <CatSvg className="h-64 w-64"></CatSvg>
      <h2
        className={`text-xl text-center font-semibold -mt-16 lg:text-2xl ${color}`}
      >
        {languageTexts[language].channel.noActive}
      </h2>
    </section>
  );
};
