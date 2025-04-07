import { CardSearchChannelProps } from "@/src/entities/props";

import { CardRoot } from "@/src/components/CardRoot/CardRoot";

import { useTheme } from "@/src/hooks/useTheme";

export const CardSearchChannel = ({ search }: CardSearchChannelProps) => {
  const { color } = useTheme();

  return (
    <CardRoot
      className={`flex flex-row [&&]:p-4 transition-all ${
        search ? "opacity-100" : "opacity-0"
      }`}
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
        <p className={`text-5xl text-center font-bold ${color}`}>{search}</p>
      </div>
    </CardRoot>
  );
};
