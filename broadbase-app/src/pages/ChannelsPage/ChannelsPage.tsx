import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useKeyboard } from "usekeyboard-react";

import type { JSX } from "react";
import type { ResponseGetCategories } from "@/types/responses";

import CategoryWithChannelsSection from "@/components/CategoryWithChannelsSection/CategoryWithChannelsSection";
import LoadingChannelsSection from "@/components/LoadingChannelsSection/LoadingChannelsSection";
import ErrorChannelsSection from "@/components/ErrorChannelsSection/ErrorChannelsSection";
import NotChannelsSection from "@/components/NotChannelsSection/NotChannelsSection";
import FloatOptions from "@/components/FloatOptions/FloatOptions";
import SideBarSettings from "@/components/SideBarSettings/SideBarSettings";

import MainLayoutStart from "@/layouts/MainLayoutStart/MainLayoutStart";
import MainLayoutCenter from "@/layouts/MainLayoutCenter/MainLayoutCenter";

import { useChannelsContext } from "@/hooks/useChannelsContext";
import { useClientContext } from "@/hooks/useClientContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import { getCategoryNameParsed } from "@/helpers/getCategoryNameParsed";
import { getChannelsSortByNumber } from "@/helpers/getChannelsSortByNumber";

import getCategories from "@/graphql/queries/getCategories";

import { LS_KEY_NAME_LAST_NUMBER_CHANNEL } from "@/constants/vars";

const ChannelsPage = (): JSX.Element => {
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
  useKeyboard({
    config: {
      keys: [
        {
          key: "ArrowLeft|ArrowRight|ArrowUp|ArrowDown",
          fn: (e): void => {
            handleChangeChannelSelectedWithArrows(e.key);
          },
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

  const { loading, data, error } = useQuery<ResponseGetCategories>(getCategories, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const categories = data?.categories.data;

    if (!categories) return;

    handleSetCategories(categories);

    const channels = categories.flatMap((category) => getChannelsSortByNumber(category.channels!));

    handleSetAllChannels(channels);
    handleSetChannelsSortByNumber(getChannelsSortByNumber(channels));
    handleSetChannelSelected(
      channels.find((channel) => channel.number === Number(get(LS_KEY_NAME_LAST_NUMBER_CHANNEL)))!
    );
  }, [data?.categories.data.length]);

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
        <ErrorChannelsSection errorMessage={error.message}></ErrorChannelsSection>
      </MainLayoutCenter>
    );
  }

  if (!categories.length || !allChannels.length) {
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
            nameCategory={getCategoryNameParsed(category.code, language)}
            channelsCategory={category.channels!}
          ></CategoryWithChannelsSection>
        );
      })}

      <SideBarSettings></SideBarSettings>
      <FloatOptions></FloatOptions>
    </MainLayoutStart>
  );
};

export default ChannelsPage;
