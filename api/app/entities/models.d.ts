export type Channel = {
  id: number;
  name: string;
  description: string;
  thumbUrl: string;
  url: string;
  urlRest?: string | null;
  number: number;
  idType?: number;
  idCategory?: number;
  idSource?: number;
  type?: Type;
  category?: Category;
  source?: Source;
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
  channels?: Channel[];
  base?: Base;
};

export type Base = {
  id: number;
  baseUrl: string;
  idSource?: number;
  source?: Source;
};
