import { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";

import { ChannelPageContext as ChannelPageContextT } from "@src/entities/contexts";
import { ChannelPageProviderProps } from "@src/entities/props";
import { Channel } from "@src/entities/api";

import { ChannelPageContext } from "@src/contexts/ChannelPage/ChannelPageContext";

import getChannelAndNumbersUsed from "@src/graphql/queries/getChannelAndNumbersUsed";

import { useRouter } from "@src/hooks/useRouter";
import { useLocalStorage } from "@src/hooks/useLocalStorage";

import { isNumberChannelValid } from "@src/helpers/isNumberChannelValid";
import { getChannelIndexByArrows } from "@src/helpers/getChannelIndexByArrows";

import { LS_KEY_NAME_LAST_NUMBER_CHANNEL } from "@src/constants/general";

export const ChannelPageProvider = ({ children }: ChannelPageProviderProps) => {
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [numbersUsed, setNumbersUsed] = useState<number[]>([]);
  const [channelChange, setChannelChange] = useState<boolean>(false);
  const [searchNumber, setSearchNumber] = useState<string>("");

  const { set, get } = useLocalStorage();
  const { params, handleNavigateToChannel } = useRouter();
  const { loading, data, error, refetch } = useQuery(getChannelAndNumbersUsed, {
    variables: { numberChannel: Number(params?.number), reload: null },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
  });

  const debounceChannelChangeRef = useRef<NodeJS.Timeout | null>(null);

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
    handleClearSearchNumber();

    refetch({
      numberChannel: Number(params?.number),
      reload: true,
    });
  };

  const handleChangeChannelWithArrows = (key: string): void => {
    clearTimeout(debounceChannelChangeRef.current!);

    debounceChannelChangeRef.current = setTimeout(() => {
      handleClearSearchNumber();

      const indexOfNumberActiveChannel = numbersUsed.findIndex(
        (numberUsed) =>
          numberUsed === Number(get(LS_KEY_NAME_LAST_NUMBER_CHANNEL))
      );
      const lastIndex = numbersUsed.length - 1;

      const newIndex = getChannelIndexByArrows(
        key as "ArrowLeft" | "ArrowRight",
        indexOfNumberActiveChannel,
        lastIndex
      );

      handleNavigateToChannel(numbersUsed[newIndex]);
    }, 300);
  };

  const handleSearchChannelWithNumbers = (key: string): void => {
    const number = Number(key);

    handleSetSearchNumber(number);
  };

  useEffect(() => {
    const currentChannel = data?.channel?.data;

    if (!currentChannel) return;

    handleClearActiveChannel();
    handleSetActiveChannel(currentChannel);
    set(LS_KEY_NAME_LAST_NUMBER_CHANNEL, currentChannel.number);
  }, [data?.channel]);

  useEffect(() => {
    const numbers = data?.numbers?.data;

    if (!numbers || !numbers?.length) return;

    if (JSON.stringify(numbersUsed) === JSON.stringify(numbers)) return;

    setNumbersUsed(numbers);
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
