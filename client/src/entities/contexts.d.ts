import { Channel } from "@/src/entities/api";
import { Language, SideBar, Theme } from "@/src/entities/client";

// ***** Channel *****

export type ChannelContext = {
  activeChannel: Channel | null;
  searchNumber: string;
  channelChange: boolean;
  handleSetActiveChannel: (channel: Channel) => void;
  handleClearActiveChannel: () => void;
  handleSetSearchNumber: (number: number) => void;
  handleClearSearchNumber: () => void;
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
