export type Sizes = {
  width: number;
  height: number;
};

export type Language = "es" | "en";

export type Theme = "light" | "dark";

export type SideBar = {
  open: boolean;
};

export type Channel = {
  id: number;
  name: string;
  description: string;
  thumbUrl: string;
  url: string;
  urlRest?: string | null;
  number: number;
  type: Type;
  category: Category;
  source: Source;
};

export type Type = {
  id: number;
  code: string;
  description: string;
  channels?: Channel[];
};

export type Category = {
  id: number;
  code: string;
  description: string;
  channels?: Channel[];
};

export type Source = {
  id: number;
  code: string;
  description: string;
  base: Base | null;
  channels?: Channel[];
};

export type Base = {
  id: number;
  baseUrl: string;
  source: Source;
};
