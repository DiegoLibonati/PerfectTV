import { useEffect, useRef, useState } from "react";

import type { JSX } from "react";
import type { ChannelProviderProps } from "@/types/props";
import type { Channel } from "@/types/app";
import type { ChannelState } from "@/types/states";

import { ChannelContext } from "@/contexts/ChannelContext/ChannelContext";

import { useRouter } from "@/hooks/useRouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import { isNumberChannelValid } from "@/helpers/isNumberChannelValid";
import { getChannelIndexByArrows } from "@/helpers/getChannelIndexByArrows";
import { startJwPlayer } from "@/helpers/startJwPlayer";

import envs from "@/constants/envs";
import { LS_KEY_NAME_LAST_NUMBER_CHANNEL } from "@/constants/vars";

export const ChannelProvider = ({ children }: ChannelProviderProps): JSX.Element => {
  const [channelState, setChannelState] = useState<ChannelState>({
    activeChannel: null,
    channelChange: false,
    numbersUsed: [],
    searchNumber: "",
  });

  const { get } = useLocalStorage();
  const { handleNavigateToChannel } = useRouter();

  const debounceChannelChangeRef = useRef<number | null>(null);

  const handleSetActiveChannel = (channel: Channel): void => {
    setChannelState((state) => ({ ...state, activeChannel: channel }));
  };

  const handleClearActiveChannel = (): void => {
    setChannelState((state) => ({ ...state, activeChannel: null }));
  };

  const handleSetSearchNumber = (number: number): void => {
    const str = String(number);

    setChannelState((state) => {
      if (state.searchNumber.length === 6) return state;
      if (!state.searchNumber) return { ...state, searchNumber: str };

      return { ...state, searchNumber: `${state.searchNumber}${str}` };
    });
  };

  const handleClearSearchNumber = (): void => {
    setChannelState((state) => ({ ...state, searchNumber: "" }));
  };

  const handleChangeChannelWithArrows = (key: string): void => {
    clearTimeout(debounceChannelChangeRef.current!);

    debounceChannelChangeRef.current = setTimeout(() => {
      handleClearSearchNumber();

      const indexOfNumberActiveChannel = channelState.numbersUsed.findIndex(
        (numberUsed) => numberUsed === Number(get(LS_KEY_NAME_LAST_NUMBER_CHANNEL))
      );
      const lastIndex = channelState.numbersUsed.length - 1;

      const newIndex = getChannelIndexByArrows(
        key as "ArrowLeft" | "ArrowRight",
        indexOfNumberActiveChannel,
        lastIndex
      );

      handleNavigateToChannel(channelState.numbersUsed[newIndex]!);
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

  const handleSetNumbersUsed = (numbersUsed: number[]): void => {
    setChannelState((state) => ({ ...state, numbersUsed: numbersUsed }));
  };

  useEffect(() => {
    setChannelState((state) => ({ ...state, channelChange: true }));

    const timeout = setTimeout(() => {
      setChannelState((state) => ({ ...state, channelChange: false }));

      if (!channelState.activeChannel) return;

      if (envs.CHANNELS_NEEDS_TO_RUN.includes(String(channelState.activeChannel.number)))
        activeChannelNeedsToRun(channelState.activeChannel);
    }, 2000);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [channelState.activeChannel]);

  useEffect(() => {
    if (!channelState.searchNumber) return;

    const number = Number(channelState.searchNumber);

    const timeout = setTimeout(() => {
      if (
        number === channelState.activeChannel?.number ||
        !isNumberChannelValid(channelState.numbersUsed, number)
      ) {
        handleClearSearchNumber();
        return;
      }

      handleNavigateToChannel(number);
      handleClearSearchNumber();
    }, 2000);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [channelState.searchNumber]);

  return (
    <ChannelContext.Provider
      value={{
        activeChannel: channelState.activeChannel,
        searchNumber: channelState.searchNumber,
        channelChange: channelState.channelChange,
        numbersUsed: channelState.numbersUsed,
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
