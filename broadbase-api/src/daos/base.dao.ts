import type { Base } from "@prisma/client";
import type { BaseCreatePayload, BaseUpdatePayload } from "@/types/payloads";

import { prisma } from "@/configs/prisma.config";

export const BaseDAO = {
  findMany: async (): Promise<Base[]> =>
    await prisma.base.findMany({
      include: { source: true },
    }),
  findById: async (id: number): Promise<Base | null> =>
    await prisma.base.findUnique({
      where: { id: id },
      include: { source: true },
    }),
  findByIdSource: async (idSource: number): Promise<Base | null> =>
    await prisma.base.findUnique({
      where: { idSource: idSource },
      include: { source: true },
    }),
  create: async (data: BaseCreatePayload): Promise<Base> =>
    await prisma.base.create({
      data: data,
      include: { source: true },
    }),
  createMany: async (data: BaseCreatePayload[]): Promise<{ count: number }> =>
    await prisma.base.createMany({ data: data }),
  upsertByIdSource: async (
    idSource: number,
    baseUrl: string
  ): Promise<Base> =>
    await prisma.base.upsert({
      where: { idSource: idSource },
      update: { baseUrl: baseUrl },
      create: { baseUrl: baseUrl, idSource: idSource },
      include: { source: true },
    }),
  update: async (id: number, data: BaseUpdatePayload): Promise<Base> =>
    await prisma.base.update({
      where: { id: id },
      data: data,
      include: { source: true },
    }),
  delete: async (id: number): Promise<Base> =>
    await prisma.base.delete({
      where: { id: id },
      include: { source: true },
    }),
};
