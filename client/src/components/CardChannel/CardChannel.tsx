import { CardChannelProps } from "@src/entities/props";

import { Heading3 } from "@src/components/Heading3/Heading3";
import { Paragraph } from "@src/components/Paragraph/Paragraph";

import { useRouter } from "@src/hooks/useRouter";
import { useTheme } from "@src/hooks/useTheme";

export const CardChannel = ({
  id,
  name,
  description,
  thumbUrl,
  number,
  active,
}: CardChannelProps) => {
  const { bg, color, bgOut, outlinePrimary } = useTheme();
  const { handleNavigateToChannel } = useRouter();

  const handleClickCardChannel = () => {
    handleNavigateToChannel(number);
  };

  return (
    <div
      className={`flex flex-col gap-2 w-full h-96 p-2 ${bgOut} rounded-lg cursor-pointer transition-all lg:flex-row lg:h-full ${
        active && `outline ${outlinePrimary}`
      } hover:bg-opacity-75 card-channel`}
      id={id}
      onClick={handleClickCardChannel}
    >
      <div
        className={`flex items-center justify-start h-[30%] w-full p-2 rounded-t-lg ${bg} lg:h-full lg:w-[30%] lg:rounded-t-none lg:rounded-tl-lg lg:rounded-bl-lg`}
      >
        <img
          className="w-full h-full object-cover"
          src={thumbUrl}
          alt={name}
        ></img>
      </div>

      <div
        className={`flex flex-col h-[70%] w-full p-2 rounded-b-lg ${bg} lg:h-full lg:w-[70%] lg:rounded-b-none lg:rounded-tr-lg lg:rounded-br-lg`}
      >
        <Heading3 className={`${color}`}>
          {name} - {number}
        </Heading3>
        <Paragraph className={`line-clamp-3 ${color}`}>{description}</Paragraph>
      </div>
    </div>
  );
};
