import { useCallback } from "react";
import { UseKeyBoardFns } from "@/src/entities/hooks";

import { useChannelContext } from "@/src/contexts/Channel/ChannelProvider";

import { useRouter } from "@/src/hooks/useRouter";

import { getChannelNumberByArrow } from "@/src/helpers/getChannelNumberByArrow";

export const useKeyBoardFns = (): UseKeyBoardFns => {
  const { handleNavigateToChannel } = useRouter();

  const { graphQL, handleRefetchChannelAndNumbersUsed, handleSetSearchNumber } =
    useChannelContext();
  const { data } = graphQL;
  const { activeChannel, numbersUsed } = data;

  const refetchChannelAndNumbersUsed = useCallback(() => {
    handleRefetchChannelAndNumbersUsed();
  }, []);

  const changeChannelWithArrows = useCallback(
    (key: string): void => {
      const newIndex = getChannelNumberByArrow(
        key,
        Number(activeChannel?.number),
        numbersUsed
      );

      handleNavigateToChannel(numbersUsed[newIndex]);
    },
    [activeChannel?.number, numbersUsed]
  );

  const searchChannelWithNumbers = useCallback((key: string): void => {
    const number = Number(key);

    handleSetSearchNumber(number);
  }, []);

  return {
    refetchChannelAndNumbersUsed: refetchChannelAndNumbersUsed,
    changeChannelWithArrows: changeChannelWithArrows,
    searchChannelWithNumbers: searchChannelWithNumbers,
  };
};
