import { useKeyBoard } from "usekeyboard-react";

import { CategoryCode } from "@src/entities/constants";

import { FloatOptions } from "@src/components/FloatOptions/FloatOptions";

import { CategoryWithChannelsSection } from "@src/containers/ChannelsPage/Sections/CategoryWithChannelsSection/CategoryWithChannelsSection";
import { LoadingChannelsSection } from "@src/containers/ChannelsPage/Sections/LoadingChannelsSection/LoadingChannelsSection";
import { ErrorChannelsSection } from "@src/containers/ChannelsPage/Sections/ErrorChannelsSection/ErrorChannelsSection";
import { NotChannelsSection } from "@src/containers/ChannelsPage/Sections/NotChannelsSection/NotChannelsSection";

import { useClientContext } from "@src/contexts/Client/ClientProvider";
import { useChannelsPageContext } from "@src/contexts/ChannelsPage/ChannelsPageProvider";

import { getCategoryNameParsed } from "@src/helpers/getCategoryNameParsed";

import { MainLayoutStart } from "@src/layouts/MainLayoutStart/MainLayoutStart";
import { MainLayoutCenter } from "@src/layouts/MainLayoutCenter/MainLayoutCenter";

export const ChannelsPage = () => {
  const {
    graphQL,
    allChannels,
    channelSelected,
    handleChangeChannelSelectedWithArrows,
    handleEnterChannelSelected,
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
        {
          key: "Enter",
          fn: handleEnterChannelSelected,
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

  if (!categories.length || !categories || !allChannels.length) {
    return (
      <MainLayoutCenter>
        <NotChannelsSection></NotChannelsSection>
        <FloatOptions></FloatOptions>
      </MainLayoutCenter>
    );
  }

  return (
    <MainLayoutStart className="flex-col gap-6 p-4 min-h-screen [&&]:h-auto">
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
      <FloatOptions></FloatOptions>
    </MainLayoutStart>
  );
};
