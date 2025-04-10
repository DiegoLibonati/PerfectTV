import { useQuery } from "@apollo/client";

import { Category } from "@/src/entities/api";
import { CategoryCode } from "@/src/entities/constants";

import { CategoryWithChannelsSection } from "@/src/containers/ChannelsPage/Sections/CategoryWithChannelsSection/CategoryWithChannelsSection";
import { LoadingChannelsSection } from "@/src/containers/ChannelsPage/Sections/LoadingChannelsSection/LoadingChannelsSection";
import { ErrorChannelsSection } from "@/src/containers/ChannelsPage/Sections/ErrorChannelsSection/ErrorChannelsSection";
import { NotChannelsSection } from "@/src/containers/ChannelsPage/Sections/NotChannelsSection/NotChannelsSection";

import { FloatOptions } from "@/src/components/FloatOptions/FloatOptions";
import { SideBarSettings } from "@/src/components/SideBarSettings/SideBarSettings";

import getCategories from "@/src/graphql/queries/getCategories";

import { useClientContext } from "@/src/contexts/Client/ClientProvider";

import { getCategoryNameParsed } from "@/src/helpers/getCategoryNameParsed";

import { MainLayoutStart } from "@/src/layouts/MainLayoutStart/MainLayoutStart";
import { MainLayoutCenter } from "@/src/layouts/MainLayoutCenter/MainLayoutCenter";

export const ChannelsPage = () => {
  const { loading, data, error } = useQuery(getCategories, {
    notifyOnNetworkStatusChange: true,
  });

  const { language } = useClientContext();

  const categories = data?.categories?.data as Category[];

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
            name={getCategoryNameParsed(
              category.code as CategoryCode,
              language
            )}
            channels={category.channels!}
          ></CategoryWithChannelsSection>
        );
      })}

      <SideBarSettings></SideBarSettings>
      <FloatOptions></FloatOptions>
    </MainLayoutStart>
  );
};
