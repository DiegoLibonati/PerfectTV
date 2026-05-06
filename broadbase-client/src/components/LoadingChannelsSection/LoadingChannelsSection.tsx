import type { JSX } from "react";

import Heading2 from "@/components/Heading2/Heading2";
import LoaderSimple from "@/components/LoaderSimple/LoaderSimple";

import { useClientContext } from "@/hooks/useClientContext";
import { useTheme } from "@/hooks/useTheme";

import { languageTexts } from "@/constants/languages";

const LoadingChannelsSection = (): JSX.Element => {
  const { language } = useClientContext();
  const { color, borderTop } = useTheme();

  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <LoaderSimple className={borderTop}></LoaderSimple>
      <Heading2 className={`text-center ${color}`}>
        {languageTexts[language].channels.loading}
      </Heading2>
    </section>
  );
};

export default LoadingChannelsSection;
