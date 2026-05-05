import type { Channel } from "@prisma/client";
import type { ChannelCreatePayload, ChannelUpdatePayload } from "@/types/payloads";

import { prisma } from "@/configs/prisma.config";

export const ChannelDAO = {
  findMany: async (): Promise<Channel[]> =>
    await prisma.channel.findMany({
      include: { type: true, category: true, source: true },
    }),
  findById: async (id: number): Promise<Channel | null> =>
    await prisma.channel.findUnique({
      where: { id: id },
      include: { type: true, category: true, source: true },
    }),
  findByNumber: async (number: number): Promise<Channel | null> =>
    await prisma.channel.findUnique({
      where: { number: number },
      include: { type: true, category: true, source: true },
    }),
  findByNameAndNumber: async (
    name: string,
    number: number
  ): Promise<Channel | null> =>
    await prisma.channel.findUnique({
      where: { name: name, number: number },
      include: { type: true, category: true, source: true },
    }),
  create: async (data: ChannelCreatePayload): Promise<Channel> =>
    await prisma.channel.create({
      data: data,
      include: { type: true, category: true, source: true },
    }),
  update: async (id: number, data: ChannelUpdatePayload): Promise<Channel> =>
    await prisma.channel.update({
      where: { id: id },
      data: data,
      include: { type: true, category: true, source: true },
    }),
  delete: async (id: number): Promise<Channel> =>
    await prisma.channel.delete({
      where: { id: id },
      include: { type: true, category: true, source: true },
    }),
};
