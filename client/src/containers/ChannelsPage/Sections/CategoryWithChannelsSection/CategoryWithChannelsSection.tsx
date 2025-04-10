import { useCallback } from "react";

import { CategoryWithChannelsSectionProps } from "@/src/entities/props";

import { Heading2 } from "@/src/components/Heading2/Heading2";
import { CardChannel } from "@/src/components/CardChannel/CardChannel";
import { SeparatorText } from "@/src/components/SeparatorText/SeparatorText";

import { useTheme } from "@/src/hooks/useTheme";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";

import { LS_KEY_NAME_LAST_NUMBER_CHANNEL } from "@/src/constants/general";

import { getChannelsSortByNumber } from "@/src/helpers/getChannelsSortByNumber";

export const CategoryWithChannelsSection = ({
  name,
  channels,
}: CategoryWithChannelsSectionProps) => {
  const { color, border } = useTheme();
  const { get } = useLocalStorage();

  const channelsSorted = useCallback(() => {
    return getChannelsSortByNumber(channels);
  }, [channels]);

  return (
    <section className="flex flex-col items-start justify-start gap-2 h-full w-full">
      <Heading2 className={`${color}`}>{name}</Heading2>
      <SeparatorText className={`w-full lg:w-64 ${border}`}></SeparatorText>

      <article className="grid grid-cols-1 gap-2 w-full h-full lg:grid-cols-3 lg:h-64">
        {channelsSorted().map((channel) => {
          return (
            <CardChannel
              key={`channel_${channel.id}_${channel.name}`}
              description={channel.description}
              name={channel.name}
              number={channel.number}
              thumbUrl={channel.thumbUrl}
              active={
                channel.number === Number(get(LS_KEY_NAME_LAST_NUMBER_CHANNEL))
              }
            ></CardChannel>
          );
        })}
      </article>
    </section>
  );
};
