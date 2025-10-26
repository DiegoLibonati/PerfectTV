import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useKeyBoard } from "usekeyboard-react";

import { Category, Channel } from "@src/entities/app";
import { CategoryCode } from "@src/entities/constants";

import { CategoryWithChannelsSection } from "@src/components/CategoryWithChannelsSection/CategoryWithChannelsSection";
import { LoadingChannelsSection } from "@src/components/LoadingChannelsSection/LoadingChannelsSection";
import { ErrorChannelsSection } from "@src/components/ErrorChannelsSection/ErrorChannelsSection";
import { NotChannelsSection } from "@src/components/NotChannelsSection/NotChannelsSection";
import { FloatOptions } from "@src/components/FloatOptions/FloatOptions";
import { SideBarSettings } from "@src/components/SideBarSettings/SideBarSettings";

import { MainLayoutStart } from "@src/layouts/MainLayoutStart/MainLayoutStart";
import { MainLayoutCenter } from "@src/layouts/MainLayoutCenter/MainLayoutCenter";

import { useChannelsContext } from "@src/hooks/useChannelsContext";
import { useClientContext } from "@src/hooks/useClientContext";
import { useLocalStorage } from "@src/hooks/useLocalStorage";

import { getCategoryNameParsed } from "@src/helpers/getCategoryNameParsed";
import { getChannelsSortByNumber } from "@src/helpers/getChannelsSortByNumber";

import getCategories from "@src/graphql/queries/getCategories";

import { LS_KEY_NAME_LAST_NUMBER_CHANNEL } from "@src/constants/vars";

export const ChannelsPage = () => {
  const {
    categories,
    allChannels,
    channelSelected,
    handleChangeChannelSelectedWithArrows,
    handleEnterChannelSelected,
    handleSetCategories,
    handleSetAllChannels,
    handleSetChannelsSortByNumber,
    handleSetChannelSelected,
  } = useChannelsContext();
  const { language } = useClientContext();
  const { get } = useLocalStorage();
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

  const { loading, data, error } = useQuery(getCategories, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const categories = data?.categories?.data as Category[];

    if (!categories) return;

    handleSetCategories(categories);

    const channels = categories.flatMap(
      (category) => getChannelsSortByNumber(category.channels!) as Channel[]
    );

    handleSetAllChannels(channels);
    handleSetChannelsSortByNumber(getChannelsSortByNumber(channels));
    handleSetChannelSelected(
      channels.find(
        (channel) =>
          channel.number === Number(get(LS_KEY_NAME_LAST_NUMBER_CHANNEL))
      )!
    );
  }, [data?.categories?.data?.length]);

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

        <SideBarSettings></SideBarSettings>
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

      <SideBarSettings></SideBarSettings>
      <FloatOptions></FloatOptions>
    </MainLayoutStart>
  );
};
