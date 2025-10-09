import prisma from "@src/configs/prisma.config";

import { TypeFlat } from "@src/entities/app";

export const TypeDAO = {
  findMany: async () => await prisma.type.findMany(),
  findById: async (id: number) =>
    await prisma.type.findUnique({
      where: { id: id },
    }),
  findByCode: async (code: string) =>
    await prisma.type.findUnique({
      where: { code: code },
    }),
  create: async (data: TypeFlat) =>
    await prisma.type.create({
      data: data,
    }),
  createMany: async (data: TypeFlat[]) =>
    await prisma.type.createMany({ data: data }),
  delete: async (id: number) => await prisma.type.delete({ where: { id: id } }),
};
