import { CSSProperties } from "react";

import { Language, Sizes, Theme, Channel } from "@src/entities/app";

export type DefaultProps = {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
};

export interface ChannelViewerProps {
  name: string;
  url: string;
  sourceCode: string;
  sizes: Sizes;
  controls: boolean;
  playing: boolean;
}

export interface CardActiveChannelProps {
  active: boolean;
  thumbUrl: string;
  name: string;
  description: string;
  number: number;
}

export interface ChannelProviderProps extends DefaultProps {}

export interface ChannelsProviderProps extends DefaultProps {}

export interface ClientProviderProps extends DefaultProps {
  defaultLanguage?: Language;
  defualtTheme?: Theme;
}

export interface ErrorChannelSectionProps {
  errorMessage: string;
}

export interface CategoryWithChannelsSectionProps {
  nameCategory: string;
  channelsCategory: Channel[];
}

export interface CardSearchChannelProps extends DefaultProps {
  search: string;
}

export interface CardChannelProps extends DefaultProps {
  id: string;
  name: string;
  thumbUrl: string;
  number: number;
  description: string;
  active: boolean;
}

export interface IframeProps extends DefaultProps {
  url: string;
  sizes: Sizes;
  title: string;
  allow?: string;
}

export interface ReactPlayerProps extends DefaultProps {
  sizes: Sizes;
  url: string;
  playing: boolean;
  controls: boolean;
}

export interface CardRootProps extends DefaultProps {}

export interface MainLayoutCenterProps extends DefaultProps {}

export interface MainLayoutStartProps extends DefaultProps {}

export interface SideBarProps extends DefaultProps {
  isOpen: boolean;
  title: string;
}

export interface SelectOptionProps extends DefaultProps {
  value: string | number | readonly string[] | undefined;
}

export interface SelectProps extends DefaultProps {
  id: string;
  value: string | number | readonly string[] | undefined;
  name: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export interface Heading2Props extends DefaultProps {}

export interface Heading3Props extends DefaultProps {}

export interface ParagraphProps extends DefaultProps {}

export interface SeparatorTextProps extends DefaultProps {}

export interface LoaderSimpleProps extends DefaultProps {}

export interface FloatOptionsProps extends DefaultProps {}

export interface ButtonFilledProps extends DefaultProps {
  ariaLabel: string;
  type: "submit" | "reset" | "button" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface FloatOptionProps extends DefaultProps {
  ariaLabel: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface UseFormProps<T> {
  initialValueForm: T;
}
