import axios from "axios";

import type { ChannelArgs, ChannelsArgs } from "@/types/args";
import type { ResponseWithData } from "@/types/responses";
import type { Category, Channel } from "@/types/app";

import { envs } from "@/configs/env.config";

const API_URL = envs.API_URL;

export const QueryResolver = {
  channels: async (_parent: unknown, args: ChannelsArgs): Promise<ResponseWithData<Channel[]>> => {
    const res = await axios.get<ResponseWithData<Channel[]>>(`${API_URL}/channels`, {
      params: args,
    });
    return res.data;
  },

  categories: async (): Promise<ResponseWithData<Category[]>> => {
    const res = await axios.get<ResponseWithData<Category[]>>(`${API_URL}/categories`);
    return res.data;
  },

  channel: async (_parent: unknown, args: ChannelArgs): Promise<ResponseWithData<Channel>> => {
    const res = await axios.get<ResponseWithData<Channel>>(`${API_URL}/channels/${args.number}`, {
      params: { reload: args.reload },
    });
    return res.data;
  },

  numbers: async (_parent: unknown): Promise<ResponseWithData<number[]>> => {
    const res = await axios.get<ResponseWithData<number[]>>(`${API_URL}/channels/numbers`);
    return res.data;
  },
};
