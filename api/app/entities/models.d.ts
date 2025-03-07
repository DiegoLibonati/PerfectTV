export type Channel = {
  id: number;
  name: string;
  description: string;
  thumbUrl: string;
  url: string;
  number: number;
  idType: number;
  idCategory: number;
  idSource: number;
};

export type Type = {
  id: number;
  code: string;
  description: string;
  channels: Channel[];
};

export type Category = {
  id: number;
  code: string;
  description: string;
  channels: Channel[];
};

export type Source = {
  id: number;
  code: string;
  description: string;
  channels: Channel[];
};
