import { CardActiveChannelProps } from "@src/entities/props";

import { CardRoot } from "@src/components/CardRoot/CardRoot";
import { Heading2 } from "@src/components/Heading2/Heading2";
import { Paragraph } from "@src/components/Paragraph/Paragraph";

import { useTheme } from "@src/hooks/useTheme";

export const CardActiveChannel = ({
  active,
  thumbUrl,
  name,
  description,
  number,
}: CardActiveChannelProps) => {
  const { color, bg } = useTheme();

  return (
    <CardRoot
      className={`flex flex-row gap-2 transition-all ${
        active ? "opacity-100" : "opacity-0"
      } ${bg}`}
    >
      <div className="flex items-center justify-center w-[30%] h-full">
        <img
          src={thumbUrl}
          alt={name}
          className="w-full h-full object-cover"
        ></img>
      </div>

      <div className="flex flex-col justify-center w-[70%] h-full lg:justify-start">
        <Heading2
          className={`text-center text-xs md:text-sm lg:text-start ${color}`}
        >
          {name} - {number}
        </Heading2>
        <Paragraph className={`hidden line-clamp-3 lg:block ${color}`}>
          {description}
        </Paragraph>
      </div>
    </CardRoot>
  );
};
