import { useEffect } from "react";
import { useKeyBoard } from "usekeyboard-react";
import { useQuery } from "@apollo/client";
import { CiGrid41 } from "react-icons/ci";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import { SideBarSettings } from "@/src/components/SideBarSettings/SideBarSettings";
import { FloatOptions } from "@/src/components/FloatOptions/FloatOptions";
import { ButtonFilled } from "@/src/components/ButtonFilled/ButtonFilled";

import { useChannelContext } from "@/src/contexts/Channel/ChannelProvider";

import { LoadingChannelSection } from "@/src/containers/ChannelPage/Sections/LoadingChannelSection/LoadingChannelSection";
import { ErrorChannelSection } from "@/src/containers/ChannelPage/Sections/ErrorChannelSection/ErrorChannelSection";
import { NotActiveChannelSection } from "@/src/containers/ChannelPage/Sections/NotActiveChannelSection/NotActiveChannelSection";
import { SearchChannelSection } from "@/src/containers/ChannelPage/Sections/SearchChannelSection/SearchChannelSection";
import { ActiveChannelSection } from "@/src/containers/ChannelPage/Sections/ActiveChannelSection/ActiveChannelSection";
import { ViewerChannelSection } from "@/src/containers/ChannelPage/Sections/ViewerChannelSection/ViewerChannelSection";

import { LS_KEY_NAME_LAST_NUMBER_CHANNEL } from "@/src/constants/general";

import { useRouter } from "@/src/hooks/useRouter";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { useTheme } from "@/src/hooks/useTheme";

import { getNumbersChannels } from "@/src/helpers/getNumbersChannels";
import { getChannelNumberByArrow } from "@/src/helpers/getChannelNumberByArrow";
import { isNumberChannelValid } from "@/src/helpers/isNumberChannelValid";

import getChannelAndNumbersUsed from "@/src/graphql/queries/getChannelAndNumbersUsed";

import { MainLayoutCenter } from "@/src/layouts/MainLayoutCenter/MainLayoutCenter";

export const ChannelPage = () => {
  const { set } = useLocalStorage();
  const { bg, color } = useTheme();
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
        {
          key: "ArrowLeft|ArrowRight",
          fn: (e) => changeChannelWithArrows(e.key),
        },
        {
          key: "0|1|2|3|4|5|6|7|8|9",
          fn: (e) => searchChannelWithNumbers(e.key),
        },
      ],
      debug: false,
      dependencies: [activeChannel?.number, data?.numbers?.data?.length],
    },
  });

  function handleOpenGridChannels() {
    handleNavigateTo("/channels");
  }

  function refetchChannel() {
    handleClearActiveChannel();
    handleClearSearchNumber();

    refetch({ variables: { numberChannel: Number(number) } });
  }

  function changeChannelWithArrows(key: string) {
    const numbers = data.numbers.data;
    const numbersUsed: number[] = getNumbersChannels(numbers);

    const newIndex = getChannelNumberByArrow(
      key,
      Number(activeChannel?.number),
      numbersUsed
    );

    handleNavigateTo(`/channel/${numbersUsed[newIndex]}`);
  }

  function searchChannelWithNumbers(key: string) {
    const number = Number(key);

    handleSetSearchNumber(number);
  }

  useEffect(() => {
    const currentChannel = data?.channel?.data;

    if (!currentChannel) return;

    handleSetActiveChannel(currentChannel);
    set(LS_KEY_NAME_LAST_NUMBER_CHANNEL, currentChannel.number);
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
      handleNavigateTo(`/channel/${number}`);
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

      {activeChannel && <ActiveChannelSection></ActiveChannelSection>}
      
      <SearchChannelSection></SearchChannelSection>

      <SideBarSettings></SideBarSettings>

      <FloatOptions>
        <ButtonFilled
          type="button"
          ariaLabel="open grid channels"
          className={`flex flex-items-center justify-center w-full p-2 cursor-pointer rounded-lg ${bg} ${color}`}
          onClick={handleOpenGridChannels}
        >
          <CiGrid41 className={`text-xl`}></CiGrid41>
        </ButtonFilled>

        <ButtonFilled
          type="button"
          ariaLabel="change channel to left"
          className={`flex flex-items-center justify-center w-full p-2 cursor-pointer rounded-lg ${bg} ${color}`}
          onClick={() => changeChannelWithArrows("ArrowLeft")}
        >
          <BsArrowLeft className={`text-xl`}></BsArrowLeft>
        </ButtonFilled>

        <ButtonFilled
          type="button"
          ariaLabel="change channel to right"
          className={`flex flex-items-center justify-center w-full p-2 cursor-pointer rounded-lg ${bg} ${color}`}
          onClick={() => changeChannelWithArrows("ArrowRight")}
        >
          <BsArrowRight className={`text-xl`}></BsArrowRight>
        </ButtonFilled>
      </FloatOptions>
    </MainLayoutCenter>
  );
};
