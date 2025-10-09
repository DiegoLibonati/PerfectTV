import axios, { AxiosResponse } from "axios";

import { ChannelArgs, ChannelsArgs } from "@src/entities/args";
import { ApiResponse } from "@src/entities/response";
import { Category, Channel } from "@src/entities/app";

import { envs } from "@src/configs/env.config";

const API_URL = envs.API_URL;

export const QueryResolver = {
  channels: async (
    _parent: unknown,
    args: ChannelsArgs
  ): Promise<ApiResponse<Channel[]>> => {
    const res: AxiosResponse<ApiResponse<Channel[]>> = await axios.get(
      `${API_URL}/channels`,
      { params: args }
    );
    return res.data;
  },

  categories: async (): Promise<ApiResponse<Category[]>> => {
    const res: AxiosResponse<ApiResponse<Category[]>> = await axios.get(
      `${API_URL}/categories`
    );
    return res.data;
  },

  channel: async (
    _parent: unknown,
    args: ChannelArgs
  ): Promise<ApiResponse<Channel>> => {
    const res: AxiosResponse<ApiResponse<Channel>> = await axios.get(
      `${API_URL}/channels/${args.number}`,
      { params: { reload: args.reload } }
    );
    return res.data;
  },

  numbers: async (_parent: unknown): Promise<ApiResponse<number[]>> => {
    const res: AxiosResponse<ApiResponse<number[]>> = await axios.get(
      `${API_URL}/channels/numbers`
    );
    return res.data;
  },
};
