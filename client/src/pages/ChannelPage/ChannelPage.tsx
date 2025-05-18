import { useKeyBoard } from "usekeyboard-react";

import { SideBarSettings } from "@src/components/SideBarSettings/SideBarSettings";

import { useChannelPageContext } from "@src/contexts/ChannelPage/ChannelPageProvider";

import { LoadingChannelSection } from "@src/containers/ChannelPage/Sections/LoadingChannelSection/LoadingChannelSection";
import { ErrorChannelSection } from "@src/containers/ChannelPage/Sections/ErrorChannelSection/ErrorChannelSection";
import { NotActiveChannelSection } from "@src/containers/ChannelPage/Sections/NotActiveChannelSection/NotActiveChannelSection";
import { SearchChannelSection } from "@src/containers/ChannelPage/Sections/SearchChannelSection/SearchChannelSection";
import { ActiveChannelSection } from "@src/containers/ChannelPage/Sections/ActiveChannelSection/ActiveChannelSection";
import { ViewerChannelSection } from "@src/containers/ChannelPage/Sections/ViewerChannelSection/ViewerChannelSection";

import { useRouter } from "@src/hooks/useRouter";

import { MainLayoutCenter } from "@src/layouts/MainLayoutCenter/MainLayoutCenter";

export const ChannelPage = () => {
  const { handleNavigateToGridChannels } = useRouter();

  const {
    graphQL,
    handleRefetchChannelAndNumbersUsed,
    handleChangeChannelWithArrows,
    handleSearchChannelWithNumbers,
  } = useChannelPageContext();

  const { data, status } = graphQL;
  const { activeChannel, numbersUsed } = data;
  const { error, loading } = status;

  useKeyBoard({
    config: {
      keys: [
        { key: "ArrowDown", fn: handleRefetchChannelAndNumbersUsed },
        { key: "ArrowUp", fn: handleNavigateToGridChannels },
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
    </MainLayoutCenter>
  );
};
