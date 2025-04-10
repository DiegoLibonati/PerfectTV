import { CSSProperties } from "react";

import { Language, Sizes, Theme } from "@/src/entities/client";
import { Channel } from "@/src/entities/api";

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

export interface ChannelProviderProps {
  children: React.ReactNode;
}

export interface ClientProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
  defualtTheme?: Theme;
}

export interface ErrorChannelSectionProps {
  errorMessage: string;
}

export interface CategoryWithChannelsSectionProps {
  name: string;
  channels: Channel[];
}

export interface CardSearchChannelProps extends GeneralComponentProps {
  search: string;
}

export interface CardChannelProps extends GeneralComponentProps {
  name: string;
  thumbUrl: string;
  number: number;
  description: string;
  active: boolean;
}

export interface IframeProps extends GeneralComponentProps {
  url: string;
  sizes: Sizes;
  title: string;
  allow?: string;
}

export interface ReactPlayerProps extends GeneralComponentProps {
  sizes: Sizes;
  url: string;
  playing: boolean;
  controls: boolean;
}

export interface CardRootProps extends GeneralComponentProps {}

export interface MainLayoutCenterProps extends GeneralComponentProps {}

export interface MainLayoutStartProps extends GeneralComponentProps {}

export interface SideBarProps extends GeneralComponentProps {
  isOpen: boolean;
  title: string;
}

export interface SelectOptionProps extends GeneralComponentProps {
  value: string | number | readonly string[] | undefined;
}

export interface SelectProps extends GeneralComponentProps {
  id: string;
  value: string | number | readonly string[] | undefined;
  name: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export interface Heading2Props extends GeneralComponentProps {}

export interface Heading3Props extends GeneralComponentProps {}

export interface ParagraphProps extends GeneralComponentProps {}

export interface SeparatorTextProps extends GeneralComponentProps {}

export interface LoaderSimpleProps extends GeneralComponentProps {}

export interface FloatOptionsProps extends GeneralComponentProps {}

export interface ButtonFilledProps extends GeneralComponentProps {
  ariaLabel: string;
  type: "submit" | "reset" | "button" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface UseFormProps<T> {
  initialValueForm: T;
}

export type GeneralComponentProps = {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
};
