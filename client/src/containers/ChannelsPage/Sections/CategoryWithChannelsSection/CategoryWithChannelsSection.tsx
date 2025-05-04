import { useCallback } from "react";

import { CategoryWithChannelsSectionProps } from "@/src/entities/props";

import { Heading2 } from "@/src/components/Heading2/Heading2";
import { CardChannel } from "@/src/components/CardChannel/CardChannel";
import { SeparatorText } from "@/src/components/SeparatorText/SeparatorText";

import { useChannelsPageContext } from "@/src/contexts/ChannelsPage/ChannelsPageProvider";

import { useTheme } from "@/src/hooks/useTheme";

import { getChannelsSortByNumber } from "@/src/helpers/getChannelsSortByNumber";

export const CategoryWithChannelsSection = ({
  nameCategory,
  channelsCategory,
}: CategoryWithChannelsSectionProps) => {
  const { channelSelected } = useChannelsPageContext();
  const { color, border } = useTheme();

  const channelsCategorySorted = useCallback(() => {
    return getChannelsSortByNumber(channelsCategory);
  }, [channelsCategory]);

  return (
    <section className="flex flex-col items-start justify-start gap-2 h-full w-full">
      <Heading2 className={`${color}`}>{nameCategory}</Heading2>
      <SeparatorText className={`w-full lg:w-64 ${border}`}></SeparatorText>

      <article className="grid grid-cols-1 gap-2 w-full h-full lg:grid-cols-3 lg:h-64">
        {channelsCategorySorted().map((channel) => {
          return (
            <CardChannel
              key={`channel_${channel.id}_${channel.name}`}
              id={`card-channel-${channel.number}`}
              description={channel.description}
              name={channel.name}
              number={channel.number}
              thumbUrl={channel.thumbUrl}
              active={channel.id === channelSelected?.id}
            ></CardChannel>
          );
        })}
      </article>
    </section>
  );
};
