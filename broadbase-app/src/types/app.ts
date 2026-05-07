export interface Sizes {
  width: number;
  height: number;
}

export type Language = "es" | "en";
export type Theme = "light" | "dark";

export type CategoryCode =
  | "news"
  | "gameplays"
  | "olds"
  | "music"
  | "entertainment"
  | "educational"
  | "tourism"
  | "sports"
  | "gastronomy"
  | "moviesseries"
  | "cartoonsanimated"
  | "documentaries"
  | "animals"
  | "radio"
  | "esports";

export interface Channel {
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
}

export interface Type {
  id: number;
  code: string;
  description: string;
  channels?: Channel[];
}

export interface Category {
  id: number;
  code: CategoryCode;
  description: string;
  channels?: Channel[];
}

export interface Source {
  id: number;
  code: string;
  description: string;
  base: Base | null;
  channels?: Channel[];
}

export interface Base {
  id: number;
  baseUrl: string;
  source: Source;
}

export interface Combo<T> {
  id: T;
  text: string;
}
