import prisma from "@src/configs/prisma.config";

import { SourceFlat } from "@src/entities/app";

export const SourceDAO = {
  findMany: async () =>
    await prisma.source.findMany({
      include: { base: { include: { source: true } } },
    }),
  findById: async (id: number) =>
    await prisma.source.findUnique({
      where: { id: id },
      include: { base: { include: { source: true } } },
    }),
  findByCode: async (code: string) =>
    await prisma.source.findUnique({
      where: { code: code },
      include: { base: { include: { source: true } } },
    }),
  create: async (data: SourceFlat) =>
    await prisma.source.create({
      data: data,
      include: { base: { include: { source: true } } },
    }),
  createMany: async (data: SourceFlat[]) =>
    await prisma.source.createMany({ data: data }),
  delete: async (id: number) =>
    await prisma.source.delete({
      where: { id: id },
      include: { base: { include: { source: true } } },
    }),
};
