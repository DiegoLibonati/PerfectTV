export type Channel = {
  id: number;
  name: string;
  description: string;
  thumbUrl: string;
  url: string;
  urlRest?: string | null;
  number: number;

  idType: number;
  idCategory: number;
  idSource: number;

  type: Type;
  category: Category;
  source: Source;
};
export type ChannelFlat = Pick<
  Channel,
  | "name"
  | "description"
  | "thumbUrl"
  | "url"
  | "urlRest"
  | "number"
  | "idType"
  | "idCategory"
  | "idSource"
>;
export type PartialChannelFlat = Partial<ChannelFlat>;

export type Type = {
  id: number;
  code: string;
  description: string;
  channels?: Channel[];
};
export type TypeFlat = Pick<Type, "code" | "description">;
export type PartialTypeFlat = Partial<TypeFlat>;

export type Category = {
  id: number;
  code: string;
  description: string;
  channels?: Channel[];
};
export type CategoryFlat = Pick<Category, "code" | "description">;
export type PartialCategoryFlat = Partial<CategoryFlat>;

export type Source = {
  id: number;
  code: string;
  description: string;
  channels?: Channel[];
  base?: Base | null;
};
export type SourceFlat = Pick<Source, "code" | "description">;
export type PartialSourceFlat = Partial<SourceFlat>;

export type Base = {
  id: number;
  baseUrl: string;
  idSource: number;
  source: Source;
};
export type BaseFlat = Pick<Base, "baseUrl" | "idSource">;
export type PartialBaseFlat = Partial<BaseFlat>;
