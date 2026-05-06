import type { JSX } from "react";
import type { CardActiveChannelProps } from "@/types/props";

import CardRoot from "@/components/CardRoot/CardRoot";
import Heading2 from "@/components/Heading2/Heading2";
import Paragraph from "@/components/Paragraph/Paragraph";

import { useTheme } from "@/hooks/useTheme";

const CardActiveChannel = ({
  active,
  thumbUrl,
  name,
  description,
  number,
}: CardActiveChannelProps): JSX.Element => {
  const { color, bg } = useTheme();

  return (
    <CardRoot
      className={`flex flex-row gap-2 transition-all ${active ? "opacity-100" : "opacity-0"} ${bg}`}
    >
      <div className="flex items-center justify-center w-[30%] h-full">
        <img src={thumbUrl} alt={name} className="w-full h-full object-cover"></img>
      </div>

      <div className="flex flex-col justify-center w-[70%] h-full lg:justify-start">
        <Heading2 className={`text-center text-xs md:text-sm lg:text-start ${color}`}>
          {name} - {number}
        </Heading2>
        <Paragraph className={`hidden line-clamp-3 lg:block ${color}`}>{description}</Paragraph>
      </div>
    </CardRoot>
  );
};

export default CardActiveChannel;
