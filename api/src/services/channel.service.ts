import { ChannelFlat, PartialChannelFlat } from "@src/entities/app";

import { ChannelDAO } from "@src/daos/channel.dao";

export const ChannelService = {
  getAllChannels: async () => {
    return await ChannelDAO.findMany();
  },
  getChannelById: async (id: number) => {
    return await ChannelDAO.findById(id);
  },
  getChannelByNumber: async (number: number) => {
    return await ChannelDAO.findByNumber(number);
  },
  getChannelByNameAndNumber: async (name: string, number: number) => {
    return await ChannelDAO.findByNameAndNumber(name, number);
  },
  createChannel: async (data: ChannelFlat) => {
    return await ChannelDAO.create(data);
  },
  updateChannel: async (id: number, data: PartialChannelFlat) => {
    return await ChannelDAO.update(id, data);
  },
  deleteChannel: async (id: number) => {
    return await ChannelDAO.delete(id);
  },
};
