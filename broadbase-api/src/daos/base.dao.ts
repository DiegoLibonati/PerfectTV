import type { BaseCreatePayload, BaseUpdatePayload } from "@/types/payloads";
import type { BaseWithRelations } from "@/types/app";

import { prisma } from "@/configs/prisma.config";

const include = { source: true } as const;

export const BaseDAO = {
  findMany: async (): Promise<BaseWithRelations[]> => await prisma.base.findMany({ include }),
  findById: async (id: number): Promise<BaseWithRelations | null> =>
    await prisma.base.findUnique({ where: { id }, include }),
  findByIdSource: async (idSource: number): Promise<BaseWithRelations | null> =>
    await prisma.base.findUnique({ where: { idSource }, include }),
  create: async (data: BaseCreatePayload): Promise<BaseWithRelations> =>
    await prisma.base.create({ data, include }),
  createMany: async (data: BaseCreatePayload[]): Promise<{ count: number }> =>
    await prisma.base.createMany({ data }),
  upsertByIdSource: async (idSource: number, baseUrl: string): Promise<BaseWithRelations> =>
    await prisma.base.upsert({
      where: { idSource },
      update: { baseUrl },
      create: { baseUrl, idSource },
      include,
    }),
  update: async (id: number, data: BaseUpdatePayload): Promise<BaseWithRelations> =>
    await prisma.base.update({ where: { id }, data, include }),
  delete: async (id: number): Promise<BaseWithRelations> =>
    await prisma.base.delete({ where: { id }, include }),
};
