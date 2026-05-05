import type { ChannelWithRelations } from "@/types/app";

import { ChannelService } from "@/services/channel.service";

export const setChannelUrl = async (
  channel: ChannelWithRelations,
  baseUrl: string
): Promise<ChannelWithRelations> => {
  return await ChannelService.updateChannel(channel.id, {
    url: `${baseUrl}${channel.urlRest}`,
  });
};
