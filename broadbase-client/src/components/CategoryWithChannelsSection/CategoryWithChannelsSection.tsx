import { useCallback } from "react";

import type { JSX } from "react";
import type { CategoryWithChannelsSectionProps } from "@/types/props";

import Heading2 from "@/components/Heading2/Heading2";
import CardChannel from "@/components/CardChannel/CardChannel";
import SeparatorText from "@/components/SeparatorText/SeparatorText";

import { useChannelsContext } from "@/hooks/useChannelsContext";
import { useTheme } from "@/hooks/useTheme";

import { getChannelsSortByNumber } from "@/helpers/getChannelsSortByNumber";

const CategoryWithChannelsSection = ({
  nameCategory,
  channelsCategory,
}: CategoryWithChannelsSectionProps): JSX.Element => {
  const { channelSelected } = useChannelsContext();
  const { color, border } = useTheme();

  const channelsCategorySorted = useCallback(() => {
    return getChannelsSortByNumber(channelsCategory);
  }, [channelsCategory]);

  return (
    <section className="flex flex-col items-start justify-start gap-2 h-full w-full">
      <Heading2 className={color}>{nameCategory}</Heading2>
      <SeparatorText className={`w-full lg:w-64 ${border}`}></SeparatorText>

      <article className="grid grid-cols-1 gap-2 w-full h-full lg:grid-cols-3">
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

export default CategoryWithChannelsSection;
