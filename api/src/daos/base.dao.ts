import prisma from "@src/configs/prisma.config";

import { BaseFlat, PartialBaseFlat } from "@src/entities/app";

export const BaseDAO = {
  findMany: async () =>
    await prisma.base.findMany({
      include: { source: true },
    }),
  findById: async (id: number) =>
    await prisma.base.findUnique({
      where: { id: id },
      include: { source: true },
    }),
  findByIdSource: async (idSource: number) =>
    await prisma.base.findUnique({
      where: { idSource: idSource },
      include: { source: true },
    }),
  create: async (data: BaseFlat) =>
    await prisma.base.create({
      data: data,
      include: { source: true },
    }),
  createMany: async (data: BaseFlat[]) =>
    await prisma.base.createMany({ data: data }),
  update: async (id: number, data: PartialBaseFlat) =>
    await prisma.base.update({
      where: { id: id },
      data: data,
      include: { source: true },
    }),
  delete: async (id: number) =>
    await prisma.base.delete({
      where: { id: id },
      include: { source: true },
    }),
};
