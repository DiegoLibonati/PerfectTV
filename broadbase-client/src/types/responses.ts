import type { Category, Channel } from "@/types/app";

export interface DefaultResponse {
  code: string;
  message: string;
}

export interface ResponseWithData<T> extends DefaultResponse {
  data: T;
}

export type ResponseDirect<T> = T;

export interface ResponseGetChannelAndNumbersUsed {
  channel: ResponseWithData<Channel | null>;
  numbers: ResponseWithData<number[]>;
}

export interface ResponseGetCategories {
  categories: ResponseWithData<Category[]>;
}
