import type { ChannelCreatePayload, ChannelUpdatePayload } from "@/types/payloads";
import type { ChannelWithRelations } from "@/types/app";

import { prisma } from "@/configs/prisma.config";

const include = { type: true, category: true, source: true } as const;

export const ChannelDAO = {
  findMany: async (): Promise<ChannelWithRelations[]> => await prisma.channel.findMany({ include }),
  findById: async (id: number): Promise<ChannelWithRelations | null> =>
    await prisma.channel.findUnique({ where: { id }, include }),
  findByNumber: async (number: number): Promise<ChannelWithRelations | null> =>
    await prisma.channel.findUnique({ where: { number }, include }),
  findByNameAndNumber: async (name: string, number: number): Promise<ChannelWithRelations | null> =>
    await prisma.channel.findUnique({ where: { name, number }, include }),
  create: async (data: ChannelCreatePayload): Promise<ChannelWithRelations> =>
    await prisma.channel.create({ data, include }),
  update: async (id: number, data: ChannelUpdatePayload): Promise<ChannelWithRelations> =>
    await prisma.channel.update({ where: { id }, data, include }),
  delete: async (id: number): Promise<ChannelWithRelations> =>
    await prisma.channel.delete({ where: { id }, include }),
};
