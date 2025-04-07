import { useEffect } from "react";
import { useKeyBoard } from "usekeyboard-react";
import { useQuery } from "@apollo/client";

import { SideBarSettings } from "@/src/components/SideBarSettings/SideBarSettings";
import { FloatOptions } from "@/src/components/FloatOptions/FloatOptions";

import { useChannelContext } from "@/src/contexts/Channel/ChannelProvider";

import { LoadingChannelSection } from "@/src/containers/TvPage/Sections/LoadingChannelSection/LoadingChannelSection";
import { ErrorChannelSection } from "@/src/containers/TvPage/Sections/ErrorChannelSection/ErrorChannelSection";
import { NotActiveChannelSection } from "@/src/containers/TvPage/Sections/NotActiveChannelSection/NotActiveChannelSection";
import { SearchChannelSection } from "@/src/containers/TvPage/Sections/SearchChannelSection/SearchChannelSection";
import { ActiveChannelSection } from "@/src/containers/TvPage/Sections/ActiveChannelSection/ActiveChannelSection";
import { ViewerChannelSection } from "@/src/containers/TvPage/Sections/ViewerChannelSection/ViewerChannelSection";

import { useRouter } from "@/src/hooks/useRouter";

import { getNumbersChannels } from "@/src/helpers/getNumbersChannels";
import { isNumberChannelValid } from "@/src/helpers/isNumberChannelValid";

import getChannelAndNumbersUsed from "@/src/graphql/queries/getChannelAndNumbersUsed";

import { MainLayoutCenter } from "@/src/layouts/MainLayoutCenter/MainLayoutCenter";

export const ChannelPage = () => {
  const { params, handleNavigateTo } = useRouter();
  const { number } = params;

  const { loading, data, error, refetch } = useQuery(getChannelAndNumbersUsed, {
    variables: { numberChannel: Number(number) },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
  });

  const {
    activeChannel,
    searchNumber,
    handleSetActiveChannel,
    handleClearActiveChannel,
    handleSetSearchNumber,
    handleClearSearchNumber,
  } = useChannelContext();

  useKeyBoard({
    config: {
      keys: [
        { key: "r", fn: refetchChannel },
        { key: "ArrowLeft|ArrowRight", fn: (e) => changeChannelWithArrows(e) },
        { key: "0|1|2|3|4|5|6|7|8|9", fn: (e) => searchChannelWithNumbers(e) },
      ],
      debug: false,
      dependencies: [activeChannel?.number, data?.numbers?.data?.length],
    },
  });

  function refetchChannel() {
    handleClearActiveChannel();
    handleClearSearchNumber();

    refetch({ variables: { numberChannel: Number(number) } });
  }

  function changeChannelWithArrows(e: KeyboardEvent) {
    const key = e.key;
    const activeChannelNumber = Number(activeChannel?.number);
    const numbers = data.numbers.data;
    const numbersUsed: number[] = getNumbersChannels(numbers);

    const indexOfActiveChannelNumber = numbersUsed.findIndex(
      (numberUsed) => numberUsed === activeChannelNumber
    );

    console.log(numbersUsed, indexOfActiveChannelNumber);

    const newIndex =
      key === "ArrowRight" &&
      indexOfActiveChannelNumber + 1 <= numbersUsed.length - 1
        ? indexOfActiveChannelNumber + 1
        : key === "ArrowRight" &&
          indexOfActiveChannelNumber + 1 > numbersUsed.length - 1
        ? 0
        : key === "ArrowLeft" && indexOfActiveChannelNumber - 1 < 0
        ? numbersUsed.length - 1
        : indexOfActiveChannelNumber - 1;

    handleNavigateTo(`/tv/${numbersUsed[newIndex]}`);
  }

  function searchChannelWithNumbers(e: KeyboardEvent) {
    const key = e.key;
    const number = Number(key);

    handleSetSearchNumber(number);
  }

  useEffect(() => {
    const currentChannel = data?.channel?.data;

    if (!currentChannel) return;

    handleSetActiveChannel(currentChannel);
  }, [data?.channel]);

  useEffect(() => {
    if (!searchNumber) return;

    const number = Number(searchNumber);
    const numbers = data.numbers.data;
    const numbersUsed: number[] = getNumbersChannels(numbers);

    const timeout = setTimeout(() => {
      if (
        (activeChannel && number === activeChannel.number) ||
        !isNumberChannelValid(numbersUsed, number)
      ) {
        handleClearSearchNumber();
        return;
      }

      handleClearActiveChannel();
      handleNavigateTo(`/tv/${number}`);
      handleClearSearchNumber();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchNumber]);

  if (loading) {
    return (
      <MainLayoutCenter>
        <LoadingChannelSection></LoadingChannelSection>
      </MainLayoutCenter>
    );
  }

  return (
    <MainLayoutCenter className="relative">
      {error && !activeChannel && (
        <ErrorChannelSection errorMessage={error.message}></ErrorChannelSection>
      )}
      {!activeChannel && !error && (
        <NotActiveChannelSection></NotActiveChannelSection>
      )}
      {activeChannel && !error && <ViewerChannelSection></ViewerChannelSection>}

      <ActiveChannelSection></ActiveChannelSection>
      <SearchChannelSection></SearchChannelSection>

      <SideBarSettings></SideBarSettings>

      <FloatOptions></FloatOptions>
    </MainLayoutCenter>
  );
};
