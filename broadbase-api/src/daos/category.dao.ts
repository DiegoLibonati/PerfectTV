import type { Category } from "@prisma/client";
import type { CategoryCreatePayload } from "@/types/payloads";

import { prisma } from "@/configs/prisma.config";

export const CategoryDAO = {
  findMany: async (): Promise<Category[]> =>
    await prisma.category.findMany({ include: { channels: true } }),
  findById: async (id: number): Promise<Category | null> =>
    await prisma.category.findUnique({
      where: { id: id },
      include: { channels: true },
    }),
  findByCode: async (code: string): Promise<Category | null> =>
    await prisma.category.findUnique({
      where: { code: code },
      include: { channels: true },
    }),
  create: async (data: CategoryCreatePayload): Promise<Category> =>
    await prisma.category.create({
      data: data,
      include: { channels: true },
    }),
  createMany: async (
    data: CategoryCreatePayload[]
  ): Promise<{ count: number }> =>
    await prisma.category.createMany({ data: data }),
  delete: async (id: number): Promise<Category> =>
    await prisma.category.delete({
      where: { id: id },
      include: { channels: true },
    }),
};
