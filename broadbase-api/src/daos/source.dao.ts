import type { Source } from "@prisma/client";
import type { SourceCreatePayload } from "@/types/payloads";

import { prisma } from "@/configs/prisma.config";

export const SourceDAO = {
  findMany: async (): Promise<Source[]> =>
    await prisma.source.findMany({
      include: { base: { include: { source: true } } },
    }),
  findById: async (id: number): Promise<Source | null> =>
    await prisma.source.findUnique({
      where: { id: id },
      include: { base: { include: { source: true } } },
    }),
  findByCode: async (code: string): Promise<Source | null> =>
    await prisma.source.findUnique({
      where: { code: code },
      include: { base: { include: { source: true } } },
    }),
  findByCodes: async (codes: string[]): Promise<Source[]> =>
    await prisma.source.findMany({
      where: { code: { in: codes } },
      include: { base: { include: { source: true } } },
    }),
  create: async (data: SourceCreatePayload): Promise<Source> =>
    await prisma.source.create({
      data: data,
      include: { base: { include: { source: true } } },
    }),
  createMany: async (data: SourceCreatePayload[]): Promise<{ count: number }> =>
    await prisma.source.createMany({ data: data }),
  delete: async (id: number): Promise<Source> =>
    await prisma.source.delete({
      where: { id: id },
      include: { base: { include: { source: true } } },
    }),
};
