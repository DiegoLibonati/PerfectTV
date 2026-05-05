import type { Channel } from "@prisma/client";
import type { ChannelCreatePayload, ChannelUpdatePayload } from "@/types/payloads";

import { ChannelDAO } from "@/daos/channel.dao";

export const ChannelService = {
  getAllChannels: async (): Promise<Channel[]> => {
    return await ChannelDAO.findMany();
  },
  getChannelById: async (id: number): Promise<Channel | null> => {
    return await ChannelDAO.findById(id);
  },
  getChannelByNumber: async (number: number): Promise<Channel | null> => {
    return await ChannelDAO.findByNumber(number);
  },
  getChannelByNameAndNumber: async (
    name: string,
    number: number
  ): Promise<Channel | null> => {
    return await ChannelDAO.findByNameAndNumber(name, number);
  },
  createChannel: async (data: ChannelCreatePayload): Promise<Channel> => {
    return await ChannelDAO.create(data);
  },
  updateChannel: async (
    id: number,
    data: ChannelUpdatePayload
  ): Promise<Channel> => {
    return await ChannelDAO.update(id, data);
  },
  deleteChannel: async (id: number): Promise<Channel> => {
    return await ChannelDAO.delete(id);
  },
};
