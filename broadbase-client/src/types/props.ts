import type { CSSProperties } from "react";

import type { Language, Sizes, Theme, Channel } from "@/types/app";

export interface DefaultProps {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

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

export type ChannelProviderProps = DefaultProps;

export type ChannelsProviderProps = DefaultProps;

export interface ClientProviderProps extends DefaultProps {
  defaultLanguage?: Language;
  defaultTheme?: Theme;
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

export type CardRootProps = DefaultProps;

export type MainLayoutCenterProps = DefaultProps;

export type MainLayoutStartProps = DefaultProps;

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

export type Heading2Props = DefaultProps;

export type Heading3Props = DefaultProps;

export type ParagraphProps = DefaultProps;

export type SeparatorTextProps = DefaultProps;

export type LoaderSimpleProps = DefaultProps;

export type FloatOptionsProps = DefaultProps;

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
