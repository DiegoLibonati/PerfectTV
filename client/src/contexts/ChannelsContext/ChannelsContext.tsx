import { createContext, useState } from "react";

import { Category, Channel } from "@src/entities/app";
import { ChannelsProviderProps } from "@src/entities/props";
import { ChannelsContext as ChannelsContextT } from "@src/entities/contexts";

import { useRouter } from "@src/hooks/useRouter";

import { getChannelIndexByArrows } from "@src/helpers/getChannelIndexByArrows";

export const ChannelsContext = createContext<ChannelsContextT | null>(null);

export const ChannelsProvider = ({ children }: ChannelsProviderProps) => {
  const [allChannels, setAllChannels] = useState<Channel[]>([]);
  const [allChannelsSortByNumber, setAllChannelsSortByNumber] = useState<
    Channel[]
  >([]);
  const [channelSelected, setChannelSelected] = useState<Channel | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const { handleNavigateToChannel } = useRouter();

  const handleSetCategories = (categories: Category[]) => {
    setCategories(categories);
  };

  const handleSetAllChannels = (channels: Channel[]) => {
    setAllChannels(channels);
  };

  const handleSetChannelsSortByNumber = (channels: Channel[]) => {
    setAllChannelsSortByNumber(channels);
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

  const handleEnterChannelSelected = () => {
    handleNavigateToChannel(channelSelected!.number);
  };

  return (
    <ChannelsContext.Provider
      value={{
        allChannels: allChannels,
        allChannelsSortByNumber: allChannelsSortByNumber,
        channelSelected: channelSelected,
        categories: categories,
        handleSetCategories: handleSetCategories,
        handleSetAllChannels: handleSetAllChannels,
        handleSetChannelsSortByNumber: handleSetChannelsSortByNumber,
        handleSetChannelSelected: handleSetChannelSelected,
        handleChangeChannelSelectedWithArrows:
          handleChangeChannelSelectedWithArrows,
        handleEnterChannelSelected: handleEnterChannelSelected,
      }}
    >
      {children}
    </ChannelsContext.Provider>
  );
};
