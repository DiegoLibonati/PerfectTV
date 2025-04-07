import { CardActiveChannelProps } from "@/src/entities/props";

import { CardRoot } from "@/src/components/CardRoot/CardRoot";

import { useTheme } from "@/src/hooks/useTheme";

export const CardActiveChannel = ({
  active,
  thumbUrl,
  name,
  description,
  number,
}: CardActiveChannelProps) => {
  const { color } = useTheme();

  return (
    <CardRoot
      className={`flex flex-row gap-2 transition-all ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center justify-center w-[30%] h-full">
        <img
          src={thumbUrl}
          alt={name}
          className="w-full h-auto object-cover"
        ></img>
      </div>

      <div className="flex flex-col justify-center w-[70%] h-full lg:justify-start">
        <h2 className={`text-xl text-center font-bold lg:text-start ${color}`}>
          {name} - {number}
        </h2>
        <p className={`hidden text-sm lg:block ${color}`}>{description}</p>
      </div>
    </CardRoot>
  );
};
