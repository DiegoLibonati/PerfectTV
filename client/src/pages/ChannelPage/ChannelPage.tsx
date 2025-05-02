import { useKeyBoard } from "usekeyboard-react";
import { CiGrid41 } from "react-icons/ci";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import { SideBarSettings } from "@/src/components/SideBarSettings/SideBarSettings";
import { FloatOptions } from "@/src/components/FloatOptions/FloatOptions";
import { FloatOption } from "@/src/components/FloatOption/FloatOption";

import { useChannelContext } from "@/src/contexts/Channel/ChannelProvider";

import { LoadingChannelSection } from "@/src/containers/ChannelPage/Sections/LoadingChannelSection/LoadingChannelSection";
import { ErrorChannelSection } from "@/src/containers/ChannelPage/Sections/ErrorChannelSection/ErrorChannelSection";
import { NotActiveChannelSection } from "@/src/containers/ChannelPage/Sections/NotActiveChannelSection/NotActiveChannelSection";
import { SearchChannelSection } from "@/src/containers/ChannelPage/Sections/SearchChannelSection/SearchChannelSection";
import { ActiveChannelSection } from "@/src/containers/ChannelPage/Sections/ActiveChannelSection/ActiveChannelSection";
import { ViewerChannelSection } from "@/src/containers/ChannelPage/Sections/ViewerChannelSection/ViewerChannelSection";

import { useRouter } from "@/src/hooks/useRouter";
import { useKeyBoardFns } from "@/src/hooks/useKeyBoardFns";

import { MainLayoutCenter } from "@/src/layouts/MainLayoutCenter/MainLayoutCenter";

export const ChannelPage = () => {
  const { handleNavigateToGridChannels } = useRouter();
  const {
    changeChannelWithArrows,
    refetchChannelAndNumbersUsed,
    searchChannelWithNumbers,
  } = useKeyBoardFns();

  const { graphQL } = useChannelContext();

  const { data, status } = graphQL;
  const { activeChannel, numbersUsed } = data;
  const { error, loading } = status;

  useKeyBoard({
    config: {
      keys: [
        { key: "r", fn: refetchChannelAndNumbersUsed },
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

      <FloatOptions>
        <FloatOption
          onClick={handleNavigateToGridChannels}
          ariaLabel="go to grid channels page"
        >
          <CiGrid41 className={`text-xl`}></CiGrid41>
        </FloatOption>

        <FloatOption
          onClick={() => changeChannelWithArrows("ArrowLeft")}
          ariaLabel="go to previous channel"
        >
          <BsArrowLeft className={`text-xl`}></BsArrowLeft>
        </FloatOption>

        <FloatOption
          onClick={() => changeChannelWithArrows("ArrowRight")}
          ariaLabel="go to next channel"
        >
          <BsArrowRight className={`text-xl`}></BsArrowRight>
        </FloatOption>
      </FloatOptions>
    </MainLayoutCenter>
  );
};
