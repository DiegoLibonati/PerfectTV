import { Channel } from "@src/entities/api";
import { GraphQL, Language, SideBar, Theme } from "@src/entities/client";

// ***** ChannelPage *****

export type ChannelPageContext = {
  searchNumber: string;
  channelChange: boolean;
  graphQL: GraphQL<{
    numbersUsed: numbers[];
    activeChannel: Channel | null;
  }>;
  handleSetActiveChannel: (channel: Channel) => void;
  handleClearActiveChannel: () => void;
  handleSetSearchNumber: (number: number) => void;
  handleClearSearchNumber: () => void;
  handleRefetchChannelAndNumbersUsed: () => void;
  handleSearchChannelWithNumbers: (key: string) => void;
  handleChangeChannelWithArrows: (key: string) => void;
};

// ***** ChannelsPage *****

export type ChannelsPageContext = {
  allChannels: Channel[];
  channelSelected: Channel | null;
  graphQL: GraphQL<{
    categories: Category[];
  }>;
  handleSetChannelSelected: (channelSelected: Channel) => void;
  handleChangeChannelSelectedWithArrows: (key: string) => void;
};

// ***** Client *****

export type ClientContext = {
  language: Language;
  theme: Theme;
  sideBar: SideBar;
  handleSetLanguage: (language: Language) => void;
  handleSetTheme: (theme: Theme) => void;
  handleSetSideBar: (sb: Partial<SideBar>) => void;
};
