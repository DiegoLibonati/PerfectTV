import type { JSX } from "react";
import type { ErrorChannelSectionProps } from "@/types/props";

import ServerErrorSvg from "@/components/Svgs/ServerErrorSvg/ServerErrorSvg";
import Heading2 from "@/components/Heading2/Heading2";

import { useClientContext } from "@/hooks/useClientContext";
import { useTheme } from "@/hooks/useTheme";

import { languageTexts } from "@/constants/languages";

const ErrorChannelSection = ({ errorMessage }: ErrorChannelSectionProps): JSX.Element => {
  const { language } = useClientContext();
  const { color } = useTheme();

  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <ServerErrorSvg className="h-64 w-64"></ServerErrorSvg>
      <Heading2 className={`text-center ${color}`}>
        {languageTexts[language].channel.error.obtaining} - {errorMessage}
      </Heading2>
    </section>
  );
};

export default ErrorChannelSection;
