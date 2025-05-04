import { useKeyBoard } from "usekeyboard-react";

import { CategoryCode } from "@/src/entities/constants";

import { CategoryWithChannelsSection } from "@/src/containers/ChannelsPage/Sections/CategoryWithChannelsSection/CategoryWithChannelsSection";
import { LoadingChannelsSection } from "@/src/containers/ChannelsPage/Sections/LoadingChannelsSection/LoadingChannelsSection";
import { ErrorChannelsSection } from "@/src/containers/ChannelsPage/Sections/ErrorChannelsSection/ErrorChannelsSection";
import { NotChannelsSection } from "@/src/containers/ChannelsPage/Sections/NotChannelsSection/NotChannelsSection";

import { FloatOptions } from "@/src/components/FloatOptions/FloatOptions";
import { SideBarSettings } from "@/src/components/SideBarSettings/SideBarSettings";

import { useClientContext } from "@/src/contexts/Client/ClientProvider";
import { useChannelsPageContext } from "@/src/contexts/ChannelsPage/ChannelsPageProvider";

import { getCategoryNameParsed } from "@/src/helpers/getCategoryNameParsed";

import { MainLayoutStart } from "@/src/layouts/MainLayoutStart/MainLayoutStart";
import { MainLayoutCenter } from "@/src/layouts/MainLayoutCenter/MainLayoutCenter";

export const ChannelsPage = () => {
  const {
    graphQL,
    allChannels,
    channelSelected,
    handleChangeChannelSelectedWithArrows,
  } = useChannelsPageContext();
  const { language } = useClientContext();

  const { status, data } = graphQL;
  const { loading, error } = status;
  const { categories } = data;

  useKeyBoard({
    config: {
      keys: [
        {
          key: "ArrowLeft|ArrowRight|ArrowUp|ArrowDown",
          fn: (e) => handleChangeChannelSelectedWithArrows(e.key),
        },
      ],
      debug: false,
      dependencies: [allChannels, channelSelected],
    },
  });

  if (loading) {
    return (
      <MainLayoutCenter>
        <LoadingChannelsSection></LoadingChannelsSection>
      </MainLayoutCenter>
    );
  }

  if (error) {
    return (
      <MainLayoutCenter>
        <ErrorChannelsSection
          errorMessage={error.message}
        ></ErrorChannelsSection>
      </MainLayoutCenter>
    );
  }

  if (!categories.length || !categories) {
    return (
      <MainLayoutCenter>
        <NotChannelsSection></NotChannelsSection>

        <SideBarSettings></SideBarSettings>
        <FloatOptions></FloatOptions>
      </MainLayoutCenter>
    );
  }

  return (
    <MainLayoutStart className="flex-col gap-2 p-4 min-h-screen [&&]:h-auto">
      {categories.map((category) => {
        return (
          <CategoryWithChannelsSection
            key={`category_${category.id}_${category.code}`}
            nameCategory={getCategoryNameParsed(
              category.code as CategoryCode,
              language
            )}
            channelsCategory={category.channels!}
          ></CategoryWithChannelsSection>
        );
      })}

      <SideBarSettings></SideBarSettings>
      <FloatOptions></FloatOptions>
    </MainLayoutStart>
  );
};
