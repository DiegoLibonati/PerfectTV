import type { Category, Channel, Language, Theme } from "@/types/app";

// ***** Channel *****

export interface ChannelContext {
  activeChannel: Channel | null;
  searchNumber: string;
  channelChange: boolean;
  numbersUsed: number[];
  handleSetActiveChannel: (channel: Channel) => void;
  handleClearActiveChannel: () => void;
  handleSetSearchNumber: (number: number) => void;
  handleClearSearchNumber: () => void;
  handleSearchChannelWithNumbers: (key: string) => void;
  handleChangeChannelWithArrows: (key: string) => void;
  handleSetNumbersUsed: (numbers: number[]) => void;
}

// ***** Channels *****

export interface ChannelsContext {
  allChannels: Channel[];
  allChannelsSortByNumber: Channel[];
  channelSelected: Channel | null;
  categories: Category[];
  handleSetCategories: (categories: Category[]) => void;
  handleSetAllChannels: (channels: Channel[]) => void;
  handleSetChannelsSortByNumber: (channels: Channel[]) => void;
  handleSetChannelSelected: (channelSelected: Channel) => void;
  handleChangeChannelSelectedWithArrows: (key: string) => void;
  handleEnterChannelSelected: () => void;
}

// ***** Client *****

export interface ClientContext {
  language: Language;
  theme: Theme;
  sideBar: boolean;
  handleSetLanguage: (language: Language) => void;
  handleSetTheme: (theme: Theme) => void;
  handleSetSideBar: (open: boolean) => void;
}
