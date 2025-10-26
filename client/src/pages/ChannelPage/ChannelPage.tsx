import { useEffect } from "react";
import { useKeyBoard } from "usekeyboard-react";
import { useQuery } from "@apollo/client";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { CiGrid41 } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";

import { SideBarSettings } from "@src/components/SideBarSettings/SideBarSettings";
import { FloatOptions } from "@src/components/FloatOptions/FloatOptions";
import { FloatOption } from "@src/components/FloatOption/FloatOption";
import { LoadingChannelSection } from "@src/components/LoadingChannelSection/LoadingChannelSection";
import { ErrorChannelSection } from "@src/components/ErrorChannelSection/ErrorChannelSection";
import { NotActiveChannelSection } from "@src/components/NotActiveChannelSection/NotActiveChannelSection";
import { SearchChannelSection } from "@src/components/SearchChannelSection/SearchChannelSection";
import { ActiveChannelSection } from "@src/components/ActiveChannelSection/ActiveChannelSection";
import { ViewerChannelSection } from "@src/components/ViewerChannelSection/ViewerChannelSection";

import { MainLayoutCenter } from "@src/layouts/MainLayoutCenter/MainLayoutCenter";

import { useRouter } from "@src/hooks/useRouter";
import { useWindow } from "@src/hooks/useWindow";
import { useChannelContext } from "@src/hooks/useChannelContext";
import { useLocalStorage } from "@src/hooks/useLocalStorage";

import getChannelAndNumbersUsed from "@src/graphql/queries/getChannelAndNumbersUsed";

import { LS_KEY_NAME_LAST_NUMBER_CHANNEL } from "@src/constants/vars";

export const ChannelPage = () => {
  const { handleReloadWindow } = useWindow();
  const { params, handleNavigateToGridChannels } = useRouter();
  const { set } = useLocalStorage();
  const {
    activeChannel,
    numbersUsed,
    handleChangeChannelWithArrows,
    handleSearchChannelWithNumbers,
    handleClearActiveChannel,
    handleSetActiveChannel,
    handleSetNumbersUsed,
    handleClearSearchNumber,
  } = useChannelContext();
  useKeyBoard({
    config: {
      keys: [
        { key: "r", fn: handleRefetchChannelAndNumbersUsed },
        { key: "t", fn: handleReloadWindow },
        { key: "g", fn: handleNavigateToGridChannels },
        {
          key: "ArrowLeft|ArrowRight",
          fn: (e) => handleChangeChannelWithArrows(e.key),
        },
        {
          key: "0|1|2|3|4|5|6|7|8|9",
          fn: (e) => handleSearchChannelWithNumbers(e.key),
        },
      ],
      debug: false,
      dependencies: [activeChannel?.number, numbersUsed.length],
    },
  });

  const { loading, data, error, refetch } = useQuery(getChannelAndNumbersUsed, {
    variables: { number: Number(params?.number), reload: null },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
  });

  function handleRefetchChannelAndNumbersUsed() {
    handleClearSearchNumber();

    refetch({
      numberChannel: Number(params?.number),
      reload: true,
    });
  }

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

    handleSetNumbersUsed(numbers);
  }, [data?.numbers?.data?.length]);

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
        <FloatOption
          onClick={handleRefetchChannelAndNumbersUsed}
          ariaLabel="force reload channel"
        >
          <TfiReload className={`text-xl`}></TfiReload>
        </FloatOption>

        <FloatOption
          onClick={handleNavigateToGridChannels}
          ariaLabel="go to grid channels page"
        >
          <CiGrid41 className={`text-xl`}></CiGrid41>
        </FloatOption>

        <FloatOption
          onClick={() => handleChangeChannelWithArrows("ArrowLeft")}
          ariaLabel="go to previous channel"
        >
          <BsArrowLeft className={`text-xl`}></BsArrowLeft>
        </FloatOption>

        <FloatOption
          onClick={() => handleChangeChannelWithArrows("ArrowRight")}
          ariaLabel="go to next channel"
        >
          <BsArrowRight className={`text-xl`}></BsArrowRight>
        </FloatOption>
      </FloatOptions>
    </MainLayoutCenter>
  );
};
