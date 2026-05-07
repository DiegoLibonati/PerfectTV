import type { ChannelCreatePayload } from "@/types/payloads";
import type { DefaultChannel } from "@/types/defaults";

import { TypeService } from "@/services/type.service";
import { CategoryService } from "@/services/category.service";
import { SourceService } from "@/services/source.service";

export const getChannelsConstantsParsed = async (
  defaultChannels: DefaultChannel[]
): Promise<ChannelCreatePayload[]> => {
  const [types, categories, sources] = await Promise.all([
    TypeService.getAllTypes(),
    CategoryService.getAllCategories(),
    SourceService.getAllSources(),
  ]);

  const typeMap = new Map(types.map((t) => [t.code, t]));
  const categoryMap = new Map(categories.map((c) => [c.code, c]));
  const sourceMap = new Map(sources.map((s) => [s.code, s]));

  return defaultChannels.map((channel) => ({
    name: channel.name,
    description: channel.description,
    thumbUrl: channel.thumbUrl,
    url: channel.url,
    urlRest: channel.urlRest,
    number: channel.number,
    idType: typeMap.get(channel.codeType)!.id,
    idCategory: categoryMap.get(channel.codeCategory)!.id,
    idSource: sourceMap.get(channel.codeSource)!.id,
  }));
};
