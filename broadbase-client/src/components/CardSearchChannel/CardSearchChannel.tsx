import type { JSX } from "react";
import type { CardSearchChannelProps } from "@/types/props";

import CardRoot from "@/components/CardRoot/CardRoot";
import Paragraph from "@/components/Paragraph/Paragraph";

import { useTheme } from "@/hooks/useTheme";

const CardSearchChannel = ({ search }: CardSearchChannelProps): JSX.Element => {
  const { color, bg } = useTheme();

  return (
    <CardRoot
      className={`flex flex-row [&&]:p-4 transition-all ${
        search ? "opacity-100" : "opacity-0"
      } ${bg}`}
    >
      {/* <div className="flex items-center justify-center w-[30%] h-full">
        <img
          className="w-full h-auto object-cover"
          src={
            "https://www.freevector.com/uploads/vector/preview/3990/FreeVector-No-Signal-TV.jpg"
          }
          alt={"no-channel"}
        ></img>
      </div> */}

      <div className="flex items-center justify-center w-full h-full">
        <Paragraph className={`[&&]:text-5xl text-center font-bold ${color}`}>{search}</Paragraph>
      </div>
    </CardRoot>
  );
};

export default CardSearchChannel;
