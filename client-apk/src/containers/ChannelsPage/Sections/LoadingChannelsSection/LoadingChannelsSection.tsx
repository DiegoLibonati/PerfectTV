import { Heading2 } from "@src/components/Heading2/Heading2";
import { LoaderSimple } from "@src/components/LoaderSimple/LoaderSimple";

import { languageTexts } from "@src/constants/languageTexts";

import { useClientContext } from "@src/contexts/Client/ClientProvider";

import { useTheme } from "@src/hooks/useTheme";

export const LoadingChannelsSection = () => {
  const { language } = useClientContext();
  const { color, borderTop } = useTheme();

  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <LoaderSimple className={`${borderTop}`}></LoaderSimple>
      <Heading2 className={`text-center ${color}`}>
        {languageTexts[language].channels.loading}
      </Heading2>
    </section>
  );
};
