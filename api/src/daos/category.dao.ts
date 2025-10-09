import prisma from "@src/configs/prisma.config";

import { CategoryFlat } from "@src/entities/app";

export const CategoryDAO = {
  findMany: async () =>
    await prisma.category.findMany({ include: { channels: true } }),
  findById: async (id: number) =>
    await prisma.category.findUnique({
      where: { id: id },
      include: { channels: true },
    }),
  findByCode: async (code: string) =>
    await prisma.category.findUnique({
      where: { code: code },
      include: { channels: true },
    }),
  create: async (data: CategoryFlat) =>
    await prisma.category.create({
      data: data,
      include: { channels: true },
    }),
  createMany: async (data: CategoryFlat[]) =>
    await prisma.category.createMany({ data: data }),
  delete: async (id: number) =>
    await prisma.category.delete({
      where: { id: id },
      include: { channels: true },
    }),
};
