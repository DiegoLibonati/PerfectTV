import { NavigateOptions, Params } from "react-router-dom";

import {
  ChannelContext,
  ChannelsContext,
  ClientContext,
} from "@src/entities/contexts";

export type UseTheme = {
  bg: string;
  bgPrimary: string;
  bgOut: string;
  color: string;
  colorPrimary: string;
  colorOut: string;
  border: string;
  borderPrimary: string;
  borderOut: string;
  borderTop: string;
  borderTopPrimary: string;
  borderTopOut: string;
  outline: string;
  outlinePrimary: string;
  outlineOut: string;
};

export type UseLocalStorage = {
  get: (key: string) => string | null;
  set: <T>(key: string, value: T) => boolean;
  del: (key: string) => boolean;
  clear: () => boolean;
};

export type UseRouter = {
  params: Readonly<Params<string>>;
  pathname: string;
  handleNavigateTo: (route: string, options?: NavigateOptions) => void;
  handleNavigateToGridChannels: () => void;
  handleNavigateToChannel: (number: number) => void;
};

export type UseWindow = {
  hash: string;
  handleChangeUrl: (route: string) => void;
  handleReloadWindow: () => void;
};

export type UseForm<T> = {
  formState: T;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
  onMultiSelectChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: keyof T
  ) => void;
  onResetForm: () => void;
  onResetSpecificKeys: (keys: Array<keyof T>) => void;
};

export type UseClientContext = ClientContext;
export type UseChannelsContext = ChannelsContext;
export type UseChannelContext = ChannelContext;
