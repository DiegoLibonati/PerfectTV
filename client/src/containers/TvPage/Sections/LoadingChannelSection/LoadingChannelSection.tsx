import { LoaderSimple } from "@/src/components/LoaderSimple/LoaderSimple";

import { languageTexts } from "@/src/constants/languageTexts";

import { useClientContext } from "@/src/contexts/Client/ClientProvider";

import { useTheme } from "@/src/hooks/useTheme";

export const LoadingChannelSection = () => {
  const { language } = useClientContext();
  const { color } = useTheme();

  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <LoaderSimple></LoaderSimple>
      <h2 className={`text-xl text-center font-semibold lg:text-2xl ${color}`}>
        {languageTexts[language].channel.loading}
      </h2>
    </section>
  );
};
