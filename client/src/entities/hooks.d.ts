import { Params } from "react-router";

export type UseTheme = {
  bg: string;
  bgOut: string;
  color: string;
  colorOut: string;
  border: string;
  borderOut: string;
  borderTop: string;
  borderTopOut: string;
};

export type UseLocalStorage = {
  get: (key: string) => string | null;
  set: (key: string, value: T) => boolean;
  del: (key: string) => boolean;
  clear: () => boolean;
};

export type UseRouter = {
  params: Readonly<Params<string>>;
  pathname: string;
  handleNavigateTo: (route: string, options?: NavigateOptions) => void;
};

export type UseWindow = {
  hash: string;
  handleChangeUrl: (route: string) => void;
};

export type UseForm<T> = {
  formState: T;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
  onMultiSelectChange: (
    e: ChangeEvent<HTMLSelectElement>,
    key: keyof T
  ) => void;
  onResetForm: () => void;
  onResetSpecificKeys: (keys: Array<keyof T>) => void;
};
