import { ErrorChannelSectionProps } from "@/src/entities/props";

import { ServerErrorSvg } from "@/src/components/Svgs/ServerErrorSvg/ServerErrorSvg";
import { Heading2 } from "@/src/components/Heading2/Heading2";

import { languageTexts } from "@/src/constants/languageTexts";

import { useClientContext } from "@/src/contexts/Client/ClientProvider";

import { useTheme } from "@/src/hooks/useTheme";

export const ErrorChannelsSection = ({
  errorMessage,
}: ErrorChannelSectionProps) => {
  const { language } = useClientContext();
  const { color } = useTheme();

  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <ServerErrorSvg className="h-64 w-64"></ServerErrorSvg>
      <Heading2 className={`text-center ${color}`}>
        {languageTexts[language].channels.error.obtaining} - {errorMessage}
      </Heading2>
    </section>
  );
};
