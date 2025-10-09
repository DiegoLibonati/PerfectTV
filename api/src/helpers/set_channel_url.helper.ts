import { Channel } from "@src/entities/app";

import { ChannelService } from "@src/services/channel.service";

export const setChannelUrl = async (
  channel: Channel,
  baseUrl: string
): Promise<Channel> => {
  const url = `${baseUrl}${channel?.urlRest}`;

  const data = { url: url };

  const channelUpdated = await ChannelService.updateChannel(channel.id, data);

  return channelUpdated!;
};
