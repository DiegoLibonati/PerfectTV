export type Env = "development" | "production" | "test";

export interface Channel {
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
}

export interface Type {
  id: number;
  code: string;
  description: string;
  channels?: Channel[];
}

export interface Category {
  id: number;
  code: string;
  description: string;
  channels?: Channel[];
}

export interface Source {
  id: number;
  code: string;
  description: string;
  channels?: Channel[];
  base?: Base | null;
}

export interface Base {
  id: number;
  baseUrl: string;
  idSource: number;
  source: Source;
}
