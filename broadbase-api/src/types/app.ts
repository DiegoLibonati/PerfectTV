import type { Prisma } from "@prisma/client";

export type Env = "development" | "production" | "test";

export type ChannelWithRelations = Prisma.ChannelGetPayload<{
  include: { type: true; category: true; source: true };
}>;

export type BaseWithRelations = Prisma.BaseGetPayload<{
  include: { source: true };
}>;

export type CategoryWithRelations = Prisma.CategoryGetPayload<{
  include: { channels: true };
}>;

export type SourceWithRelations = Prisma.SourceGetPayload<{
  include: { base: { include: { source: true } } };
}>;
