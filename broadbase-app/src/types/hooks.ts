import type { NavigateOptions, Params } from "react-router-dom";
import type { ChannelContext, ChannelsContext, ClientContext } from "@/types/contexts";

export interface UseTheme {
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
}

export interface UseLocalStorage {
  get: (key: string) => string | null;
  set: (key: string, value: unknown) => boolean;
  del: (key: string) => boolean;
  clear: () => boolean;
}

export interface UseRouter {
  params: Readonly<Params>;
  pathname: string;
  handleNavigateTo: (route: string, options?: NavigateOptions) => void;
  handleNavigateToGridChannels: () => void;
  handleNavigateToChannel: (number: number) => void;
}

export interface UseWindow {
  hash: string;
  handleChangeUrl: (route: string) => void;
  handleReloadWindow: () => void;
}

export interface UseForm<T> {
  formState: T;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
  onMultiSelectChange: (e: React.ChangeEvent<HTMLSelectElement>, key: keyof T) => void;
  onResetForm: () => void;
  onResetSpecificKeys: (keys: (keyof T)[]) => void;
}

export type UseClientContext = ClientContext;
export type UseChannelsContext = ChannelsContext;
export type UseChannelContext = ChannelContext;
