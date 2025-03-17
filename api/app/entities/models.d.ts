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
  channels?: Channel[];
};
