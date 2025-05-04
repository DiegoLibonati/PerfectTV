import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { Category, Channel } from "@/src/entities/api";
import { ChannelsPageProviderProps } from "@/src/entities/props";
import { ChannelsPageContext as ChannelsPageContextT } from "@/src/entities/contexts";

import { ChannelsPageContext } from "@/src/contexts/ChannelsPage/ChannelsPageContext";

import { useLocalStorage } from "@/src/hooks/useLocalStorage";

import { getChannelsSortByNumber } from "@/src/helpers/getChannelsSortByNumber";
import { getChannelIndexByArrows } from "@/src/helpers/getChannelIndexByArrows";

import getCategories from "@/src/graphql/queries/getCategories";

import { LS_KEY_NAME_LAST_NUMBER_CHANNEL } from "@/src/constants/general";

export const ChannelsPageProvider = ({
  children,
}: ChannelsPageProviderProps) => {
  const [allChannels, setAllChannels] = useState<Channel[]>([]);
  const [channelSelected, setChannelSelected] = useState<Channel | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const { loading, data, error } = useQuery(getCategories, {
    notifyOnNetworkStatusChange: true,
  });

  const { get } = useLocalStorage();

  const handleSetCategories = (categories: Category[]) => {
    setCategories(categories);
  };

  const handleSetChannels = (channels: Channel[]) => {
    setAllChannels(channels);
  };

  const handleSetChannelSelected = (channelSelected: Channel) => {
    setChannelSelected(channelSelected);
  };

  const handleChangeChannelSelectedWithArrows = (key: string) => {
    const indexOfChannelSelected = allChannels.findIndex(
      (channel) => channel.id === channelSelected?.id
    );

    if (indexOfChannelSelected === -1) return;

    const lastIndex = allChannels.length - 1;
    const newIndex = getChannelIndexByArrows(
      key as "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown",
      indexOfChannelSelected,
      lastIndex,
      "card-channel"
    );

    const newChannelSelected = allChannels[newIndex];

    if (!newChannelSelected) return;

    handleSetChannelSelected(newChannelSelected);
  };

  useEffect(() => {
    const categories = data?.categories?.data as Category[];

    if (!categories) return;

    handleSetCategories(categories);

    const channels = categories.flatMap(
      (category) => category.channels as Channel[]
    );

    handleSetChannels(getChannelsSortByNumber(channels));
    handleSetChannelSelected(
      channels.find(
        (channel) =>
          channel.number === Number(get(LS_KEY_NAME_LAST_NUMBER_CHANNEL))
      )!
    );
  }, [data?.categories?.data?.length]);

  return (
    <ChannelsPageContext.Provider
      value={{
        allChannels: allChannels,
        channelSelected: channelSelected,
        graphQL: {
          status: { loading: loading, error: error },
          data: { categories: categories },
        },
        handleSetChannelSelected: handleSetChannelSelected,
        handleChangeChannelSelectedWithArrows:
          handleChangeChannelSelectedWithArrows,
      }}
    >
      {children}
    </ChannelsPageContext.Provider>
  );
};

export const useChannelsPageContext = (): ChannelsPageContextT => {
  return useContext(ChannelsPageContext)!;
};
