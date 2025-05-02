import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { ChannelContext as ChannelContextT } from "@/src/entities/contexts";
import { ChannelProviderProps } from "@/src/entities/props";
import { Channel } from "@/src/entities/api";

import { ChannelContext } from "@/src/contexts/Channel/ChannelContext";

import getChannelAndNumbersUsed from "@/src/graphql/queries/getChannelAndNumbersUsed";

import { useRouter } from "@/src/hooks/useRouter";

import { getNumbersChannels } from "@/src/helpers/getNumbersChannels";
import { isNumberChannelValid } from "@/src/helpers/isNumberChannelValid";

import { LS_KEY_NAME_LAST_NUMBER_CHANNEL } from "@/src/constants/general";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";

export const ChannelProvider = ({ children }: ChannelProviderProps) => {
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [numbersUsed, setNumbersUsed] = useState<number[]>([]);
  const [channelChange, setChannelChange] = useState<boolean>(false);
  const [searchNumber, setSearchNumber] = useState<string>("");

  const { set } = useLocalStorage();
  const { params, handleNavigateToChannel } = useRouter();
  const { loading, data, error, refetch } = useQuery(getChannelAndNumbersUsed, {
    variables: { numberChannel: Number(params?.number) },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
  });

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

  const handleRefetchChannelAndNumbersUsed = () => {
    handleClearActiveChannel();
    handleClearSearchNumber();

    refetch({ variables: { numberChannel: Number(params?.number) } });
  };

  useEffect(() => {
    const currentChannel = data?.channel?.data;

    if (!currentChannel) return;

    handleSetActiveChannel(currentChannel);
    set(LS_KEY_NAME_LAST_NUMBER_CHANNEL, currentChannel.number);
  }, [data?.channel]);

  useEffect(() => {
    const numbers = data?.numbers?.data as Pick<Channel, "id" | "number">[];

    if (!numbers || !numbers?.length) return;

    const newNumbersUsed: number[] = getNumbersChannels(numbers);

    if (JSON.stringify(numbersUsed) === JSON.stringify(newNumbersUsed)) return;

    setNumbersUsed(newNumbersUsed);
  }, [data?.numbers?.data?.length]);

  useEffect(() => {
    setChannelChange(true);

    const timeout = setTimeout(() => {
      setChannelChange(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [activeChannel]);

  useEffect(() => {
    if (!searchNumber) return;

    const number = Number(searchNumber);

    const timeout = setTimeout(() => {
      if (
        (activeChannel && number === activeChannel.number) ||
        !isNumberChannelValid(numbersUsed, number)
      ) {
        handleClearSearchNumber();
        return;
      }

      handleClearActiveChannel();
      handleNavigateToChannel(number);
      handleClearSearchNumber();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchNumber]);

  return (
    <ChannelContext.Provider
      value={{
        searchNumber: searchNumber,
        channelChange: channelChange,
        graphQL: {
          status: { loading: loading, error: error },
          data: {
            numbersUsed: numbersUsed,
            activeChannel: activeChannel,
          },
        },
        handleSetActiveChannel: handleSetActiveChannel,
        handleClearActiveChannel: handleClearActiveChannel,
        handleSetSearchNumber: handleSetSearchNumber,
        handleClearSearchNumber: handleClearSearchNumber,
        handleRefetchChannelAndNumbersUsed: handleRefetchChannelAndNumbersUsed,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannelContext = (): ChannelContextT => {
  return useContext(ChannelContext)!;
};
