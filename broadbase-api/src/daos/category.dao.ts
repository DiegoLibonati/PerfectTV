import type { CategoryCreatePayload } from "@/types/payloads";
import type { CategoryWithRelations } from "@/types/app";

import { prisma } from "@/configs/prisma.config";

const include = { channels: true } as const;

export const CategoryDAO = {
  findMany: async (): Promise<CategoryWithRelations[]> =>
    await prisma.category.findMany({ include }),
  findById: async (id: number): Promise<CategoryWithRelations | null> =>
    await prisma.category.findUnique({ where: { id }, include }),
  findByCode: async (code: string): Promise<CategoryWithRelations | null> =>
    await prisma.category.findUnique({ where: { code }, include }),
  create: async (data: CategoryCreatePayload): Promise<CategoryWithRelations> =>
    await prisma.category.create({ data, include }),
  createMany: async (data: CategoryCreatePayload[]): Promise<{ count: number }> =>
    await prisma.category.createMany({ data, skipDuplicates: true }),
  delete: async (id: number): Promise<CategoryWithRelations> =>
    await prisma.category.delete({ where: { id }, include }),
};
