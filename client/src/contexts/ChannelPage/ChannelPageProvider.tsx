import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { ChannelPageContext as ChannelPageContextT } from "@src/entities/contexts";
import { ChannelPageProviderProps } from "@src/entities/props";
import { Channel } from "@src/entities/api";

import { ChannelPageContext } from "@src/contexts/ChannelPage/ChannelPageContext";

import getChannelAndNumbersUsed from "@src/graphql/queries/getChannelAndNumbersUsed";

import { useRouter } from "@src/hooks/useRouter";
import { useLocalStorage } from "@src/hooks/useLocalStorage";

import { getNumbersChannels } from "@src/helpers/getNumbersChannels";
import { isNumberChannelValid } from "@src/helpers/isNumberChannelValid";
import { getChannelIndexByArrows } from "@src/helpers/getChannelIndexByArrows";

import { LS_KEY_NAME_LAST_NUMBER_CHANNEL } from "@src/constants/general";

export const ChannelPageProvider = ({ children }: ChannelPageProviderProps) => {
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

  const handleChangeChannelWithArrows = (key: string): void => {
    handleClearActiveChannel();
    handleClearSearchNumber();

    const indexOfNumberActiveChannel = numbersUsed.findIndex(
      (numberUsed) => numberUsed === activeChannel?.number
    );
    const lastIndex = numbersUsed.length - 1;

    const newIndex = getChannelIndexByArrows(
      key as "ArrowLeft" | "ArrowRight",
      indexOfNumberActiveChannel,
      lastIndex
    );

    handleNavigateToChannel(numbersUsed[newIndex]);
  };

  const handleSearchChannelWithNumbers = (key: string): void => {
    const number = Number(key);

    handleSetSearchNumber(number);
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
    <ChannelPageContext.Provider
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
        handleSearchChannelWithNumbers: handleSearchChannelWithNumbers,
        handleChangeChannelWithArrows: handleChangeChannelWithArrows,
      }}
    >
      {children}
    </ChannelPageContext.Provider>
  );
};

export const useChannelPageContext = (): ChannelPageContextT => {
  return useContext(ChannelPageContext)!;
};
