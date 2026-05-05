import type { Channel } from "@prisma/client";

import { ChannelService } from "@/services/channel.service";

export const setChannelUrl = async (
  channel: Channel,
  baseUrl: string
): Promise<Channel> => {
  const channelUpdated = await ChannelService.updateChannel(channel.id, {
    url: `${baseUrl}${channel.urlRest}`,
  });

  return channelUpdated!;
};
