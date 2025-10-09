import prisma from "@src/configs/prisma.config";

import { ChannelFlat, PartialChannelFlat } from "@src/entities/app";

export const ChannelDAO = {
  findMany: async () =>
    await prisma.channel.findMany({
      include: { type: true, category: true, source: true },
    }),
  findById: async (id: number) =>
    await prisma.channel.findUnique({
      where: { id: id },
      include: { type: true, category: true, source: true },
    }),
  findByNumber: async (number: number) =>
    await prisma.channel.findUnique({
      where: { number: number },
      include: { type: true, category: true, source: true },
    }),
  findByNameAndNumber: async (name: string, number: number) =>
    await prisma.channel.findUnique({
      where: { name: name, number: number },
      include: { type: true, category: true, source: true },
    }),
  create: async (data: ChannelFlat) =>
    await prisma.channel.create({
      data: data,
      include: { type: true, category: true, source: true },
    }),
  update: async (id: number, data: PartialChannelFlat) =>
    await prisma.channel.update({
      where: { id: id },
      data: data,
      include: { type: true, category: true, source: true },
    }),
  delete: async (id: number) =>
    await prisma.channel.delete({
      where: { id: id },
      include: { type: true, category: true, source: true },
    }),
};
