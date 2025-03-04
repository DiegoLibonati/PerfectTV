export type Channel = {
  id: number;
  name: string;
  description: string;
  thumbUrl: string;
  url: string;
  number: number;
  idType: number;
  idCategory: number;
};

export type Type = {
  id: number;
  name: string;
  channels: Channel[];
};

export type Category = {
  id: number;
  name: string;
  channels: Channel[];
};
