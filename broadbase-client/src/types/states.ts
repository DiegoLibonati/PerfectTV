import type { Category, Channel, Language, Theme } from "@/types/app";

export interface ClientState {
  language: Language;
  theme: Theme;
  sideBar: {
    open: boolean;
  };
}

export interface ChannelsState {
  allChannels: Channel[];
  allChannelsSortByNumber: Channel[];
  channelSelected: Channel | null;
  categories: Category[];
}

export interface ChannelState {
  activeChannel: Channel | null;
  numbersUsed: number[];
  channelChange: boolean;
  searchNumber: string;
}
