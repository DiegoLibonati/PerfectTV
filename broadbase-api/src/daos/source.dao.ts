import type { SourceCreatePayload } from "@/types/payloads";
import type { SourceWithRelations } from "@/types/app";

import { prisma } from "@/configs/prisma.config";

const include = { base: { include: { source: true } } } as const;

export const SourceDAO = {
  findMany: async (): Promise<SourceWithRelations[]> => await prisma.source.findMany({ include }),
  findById: async (id: number): Promise<SourceWithRelations | null> =>
    await prisma.source.findUnique({ where: { id }, include }),
  findByCode: async (code: string): Promise<SourceWithRelations | null> =>
    await prisma.source.findUnique({ where: { code }, include }),
  findByCodes: async (codes: string[]): Promise<SourceWithRelations[]> =>
    await prisma.source.findMany({ where: { code: { in: codes } }, include }),
  create: async (data: SourceCreatePayload): Promise<SourceWithRelations> =>
    await prisma.source.create({ data, include }),
  createMany: async (data: SourceCreatePayload[]): Promise<{ count: number }> =>
    await prisma.source.createMany({ data, skipDuplicates: true }),
  delete: async (id: number): Promise<SourceWithRelations> =>
    await prisma.source.delete({ where: { id }, include }),
};
