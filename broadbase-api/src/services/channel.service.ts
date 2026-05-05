import type { ChannelCreatePayload, ChannelUpdatePayload } from "@/types/payloads";
import type { ChannelWithRelations } from "@/types/app";

import { ChannelDAO } from "@/daos/channel.dao";

export const ChannelService = {
  getAllChannels: async (): Promise<ChannelWithRelations[]> => {
    return await ChannelDAO.findMany();
  },
  getChannelById: async (id: number): Promise<ChannelWithRelations | null> => {
    return await ChannelDAO.findById(id);
  },
  getChannelByNumber: async (number: number): Promise<ChannelWithRelations | null> => {
    return await ChannelDAO.findByNumber(number);
  },
  getChannelByNameAndNumber: async (
    name: string,
    number: number
  ): Promise<ChannelWithRelations | null> => {
    return await ChannelDAO.findByNameAndNumber(name, number);
  },
  createChannel: async (data: ChannelCreatePayload): Promise<ChannelWithRelations> => {
    return await ChannelDAO.create(data);
  },
  updateChannel: async (id: number, data: ChannelUpdatePayload): Promise<ChannelWithRelations> => {
    return await ChannelDAO.update(id, data);
  },
  deleteChannel: async (id: number): Promise<ChannelWithRelations> => {
    return await ChannelDAO.delete(id);
  },
};
