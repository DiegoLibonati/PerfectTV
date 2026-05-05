import type { Channel, Type, Category, Source, Base } from "@prisma/client";

export type ChannelCreatePayload = Pick<
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
export type TypeCreatePayload = Pick<Type, "code" | "description">;
export type CategoryCreatePayload = Pick<Category, "code" | "description">;
export type SourceCreatePayload = Pick<Source, "code" | "description">;
export type BaseCreatePayload = Pick<Base, "baseUrl" | "idSource">;

export type ChannelUpdatePayload = Partial<ChannelCreatePayload>;
export type TypeUpdatePayload = Partial<TypeCreatePayload>;
export type CategoryUpdatePayload = Partial<CategoryCreatePayload>;
export type SourceUpdatePayload = Partial<SourceCreatePayload>;
export type BaseUpdatePayload = Partial<BaseCreatePayload>;
