import { Heading2 } from "@src/components/Heading2/Heading2";
import { LoaderSimple } from "@src/components/LoaderSimple/LoaderSimple";

import { useClientContext } from "@src/hooks/useClientContext";
import { useTheme } from "@src/hooks/useTheme";

import { languageTexts } from "@src/constants/languageTexts";

export const LoadingChannelSection = () => {
  const { language } = useClientContext();
  const { color, borderTop } = useTheme();

  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <LoaderSimple className={`${borderTop}`}></LoaderSimple>
      <Heading2 className={`text-center ${color}`}>
        {languageTexts[language].channel.loading}
      </Heading2>
    </section>
  );
};
