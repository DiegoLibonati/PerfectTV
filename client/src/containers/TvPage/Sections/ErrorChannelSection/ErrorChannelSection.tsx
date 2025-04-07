import { ErrorChannelSectionProps } from "@/src/entities/props";

import { ServerErrorSvg } from "@/src/components/Svgs/ServerErrorSvg/ServerErrorSvg";

import { languageTexts } from "@/src/constants/languageTexts";

import { useClientContext } from "@/src/contexts/Client/ClientProvider";

import { useTheme } from "@/src/hooks/useTheme";

export const ErrorChannelSection = ({
  errorMessage,
}: ErrorChannelSectionProps) => {
  const { language } = useClientContext();
  const { color } = useTheme();

  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <ServerErrorSvg className="h-64 w-64"></ServerErrorSvg>
      <h2 className={`text-xl text-center font-semibold lg:text-2xl ${color}`}>
        {languageTexts[language].channel.error.obtaining} - {errorMessage}
      </h2>
    </section>
  );
};
