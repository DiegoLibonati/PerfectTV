import type { ChannelCreatePayload } from "@/types/payloads";

import { ChannelService } from "@/services/channel.service";

export const ChannelsStartUp = async (payload: ChannelCreatePayload[]): Promise<void> => {
  await ChannelService.createManyChannels(payload);
};
