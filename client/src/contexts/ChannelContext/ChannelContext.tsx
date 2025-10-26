import { createContext, useEffect, useRef, useState } from "react";

import { ChannelContext as ChannelContextT } from "@src/entities/contexts";
import { ChannelProviderProps } from "@src/entities/props";
import { Channel } from "@src/entities/app";

import { useRouter } from "@src/hooks/useRouter";
import { useLocalStorage } from "@src/hooks/useLocalStorage";

import { isNumberChannelValid } from "@src/helpers/isNumberChannelValid";
import { getChannelIndexByArrows } from "@src/helpers/getChannelIndexByArrows";
import { startJwPlayer } from "@src/helpers/startJwPlayer";

import envs from "@src/constants/envs";
import { LS_KEY_NAME_LAST_NUMBER_CHANNEL } from "@src/constants/vars";

export const ChannelContext = createContext<ChannelContextT | null>(null);

export const ChannelProvider = ({ children }: ChannelProviderProps) => {
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [numbersUsed, setNumbersUsed] = useState<number[]>([]);
  const [channelChange, setChannelChange] = useState<boolean>(false);
  const [searchNumber, setSearchNumber] = useState<string>("");

  const { get } = useLocalStorage();
  const { handleNavigateToChannel } = useRouter();

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

  const activeChannelNeedsToRun = (activeChannel: Channel): void => {
    switch (activeChannel.source.code) {
      case "ftv": {
        startJwPlayer();
        break;
      }
      default:
        break;
    }
  };

  const handleSetNumbersUsed = (numbersUsed: number[]) => {
    setNumbersUsed(numbersUsed);
  };

  useEffect(() => {
    setChannelChange(true);

    const timeout = setTimeout(() => {
      setChannelChange(false);

      if (!activeChannel) return;

      if (envs.CHANNELS_NEEDS_TO_RUN.includes(String(activeChannel!.number)))
        activeChannelNeedsToRun(activeChannel!);
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
    <ChannelContext.Provider
      value={{
        activeChannel: activeChannel,
        searchNumber: searchNumber,
        channelChange: channelChange,
        numbersUsed: numbersUsed,
        handleSetActiveChannel: handleSetActiveChannel,
        handleClearActiveChannel: handleClearActiveChannel,
        handleSetSearchNumber: handleSetSearchNumber,
        handleClearSearchNumber: handleClearSearchNumber,
        handleSearchChannelWithNumbers: handleSearchChannelWithNumbers,
        handleChangeChannelWithArrows: handleChangeChannelWithArrows,
        handleSetNumbersUsed: handleSetNumbersUsed,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};
