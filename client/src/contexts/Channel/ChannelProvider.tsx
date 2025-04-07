import { useContext, useEffect, useState } from "react";

import { ChannelContext as ChannelContextT } from "@/src/entities/contexts";
import { ChannelProviderProps } from "@/src/entities/props";
import { Channel } from "@/src/entities/api";

import { ChannelContext } from "@/src/contexts/Channel/ChannelContext";

export const ChannelProvider = ({ children }: ChannelProviderProps) => {
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [channelChange, setChannelChange] = useState<boolean>(false);
  const [searchNumber, setSearchNumber] = useState<string>("");

  const handleSetActiveChannel = (channel: Channel): void => {
    setActiveChannel(channel);
  };

  const handleClearActiveChannel = (): void => {
    setActiveChannel(null);
  };

  const handleSetSearchNumber = (number: number): void => {
    const str = String(number);

    setSearchNumber((state) => {
      if (state.length === 6) return state;
      if (!state) return str;

      return `${state}${str}`;
    });
  };

  const handleClearSearchNumber = (): void => {
    setSearchNumber("");
  };

  useEffect(() => {
    setChannelChange(true);

    const timeout = setTimeout(() => {
      setChannelChange(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [activeChannel]);

  return (
    <ChannelContext.Provider
      value={{
        activeChannel: activeChannel,
        searchNumber: searchNumber,
        channelChange: channelChange,
        handleSetActiveChannel: handleSetActiveChannel,
        handleClearActiveChannel: handleClearActiveChannel,
        handleSetSearchNumber: handleSetSearchNumber,
        handleClearSearchNumber: handleClearSearchNumber,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannelContext = (): ChannelContextT => {
  return useContext(ChannelContext)!;
};
