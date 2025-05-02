import { Channel } from "@/src/entities/api";
import { Language, SideBar, Theme } from "@/src/entities/client";
import { ApolloError } from "@apollo/client";

// ***** Channel *****

export type GraphQL = {
  status: { loading: boolean; error: ApolloError | undefined };
  data: {
    numbersUsed: numbers[];
    activeChannel: Channel | null;
  };
};

export type ChannelContext = {
  searchNumber: string;
  channelChange: boolean;
  graphQL: GraphQL;
  handleSetActiveChannel: (channel: Channel) => void;
  handleClearActiveChannel: () => void;
  handleSetSearchNumber: (number: number) => void;
  handleClearSearchNumber: () => void;
  handleRefetchChannelAndNumbersUsed: () => void;
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
