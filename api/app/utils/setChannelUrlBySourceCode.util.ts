import { Channel } from "@app/entities/models";

import channelRepository from "@app/models/dataAccess/ChannelRepository.model";

export const setChannelUrlBySourceCode = async (
  channels: Channel[],
  code: string,
  baseUrl: string
): Promise<Channel[]> => {
  const newChannels = await Promise.all(
    channels.map(async (channel) => {
      if (channel.source?.code === code) {
        const url = `${baseUrl}${channel?.urlRest}`;

        const data = { url: url };

        return await channelRepository.updateChannel(channel.id, data);
      }

      return channel;
    })
  );

  return newChannels;
};
