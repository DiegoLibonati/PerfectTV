import { Channel } from "@app/entities/models";

import channelRepository from "@app/models/dataAccess/ChannelRepository.model";

export const setChannelUrl = async (
  channel: Channel,
  baseUrl: string
): Promise<Channel> => {
  const url = `${baseUrl}${channel?.urlRest}`;

  const data = { url: url };

  const channelUpdated = await channelRepository.updateChannel(
    channel.id,
    data
  );

  return channelUpdated!;
};
