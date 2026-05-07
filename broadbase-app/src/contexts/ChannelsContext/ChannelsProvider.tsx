import { useState } from "react";

import type { JSX } from "react";
import type { Category, Channel } from "@/types/app";
import type { ChannelsProviderProps } from "@/types/props";
import type { ChannelsState } from "@/types/states";

import { ChannelsContext } from "@/contexts/ChannelsContext/ChannelsContext";

import { useRouter } from "@/hooks/useRouter";

import { getChannelIndexByArrows } from "@/helpers/getChannelIndexByArrows";

export const ChannelsProvider = ({ children }: ChannelsProviderProps): JSX.Element => {
  const [channelsState, setChannelsState] = useState<ChannelsState>({
    allChannels: [],
    allChannelsSortByNumber: [],
    categories: [],
    channelSelected: null,
  });

  const { handleNavigateToChannel } = useRouter();

  const handleSetCategories = (categories: Category[]): void => {
    setChannelsState((state) => ({ ...state, categories: categories }));
  };

  const handleSetAllChannels = (channels: Channel[]): void => {
    setChannelsState((state) => ({ ...state, allChannels: channels }));
  };

  const handleSetChannelsSortByNumber = (channels: Channel[]): void => {
    setChannelsState((state) => ({ ...state, allChannelsSortByNumber: channels }));
  };

  const handleSetChannelSelected = (channelSelected: Channel): void => {
    setChannelsState((state) => ({ ...state, channelSelected: channelSelected }));
  };

  const handleChangeChannelSelectedWithArrows = (key: string): void => {
    const indexOfChannelSelected = channelsState.allChannels.findIndex(
      (channel) => channel.id === channelsState.channelSelected?.id
    );

    if (indexOfChannelSelected === -1) return;

    const lastIndex = channelsState.allChannels.length - 1;
    const newIndex = getChannelIndexByArrows(
      key as "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown",
      indexOfChannelSelected,
      lastIndex,
      "card-channel"
    );

    const newChannelSelected = channelsState.allChannels[newIndex];

    if (!newChannelSelected) return;

    handleSetChannelSelected(newChannelSelected);
  };

  const handleEnterChannelSelected = (): void => {
    if (!channelsState.channelSelected) return;
    handleNavigateToChannel(channelsState.channelSelected.number);
  };

  return (
    <ChannelsContext.Provider
      value={{
        allChannels: channelsState.allChannels,
        allChannelsSortByNumber: channelsState.allChannelsSortByNumber,
        channelSelected: channelsState.channelSelected,
        categories: channelsState.categories,
        handleSetCategories: handleSetCategories,
        handleSetAllChannels: handleSetAllChannels,
        handleSetChannelsSortByNumber: handleSetChannelsSortByNumber,
        handleSetChannelSelected: handleSetChannelSelected,
        handleChangeChannelSelectedWithArrows: handleChangeChannelSelectedWithArrows,
        handleEnterChannelSelected: handleEnterChannelSelected,
      }}
    >
      {children}
    </ChannelsContext.Provider>
  );
};
