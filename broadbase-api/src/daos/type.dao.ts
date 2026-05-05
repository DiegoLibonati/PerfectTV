import type { Type } from "@prisma/client";
import type { TypeCreatePayload } from "@/types/payloads";

import { prisma } from "@/configs/prisma.config";

export const TypeDAO = {
  findMany: async (): Promise<Type[]> => await prisma.type.findMany(),
  findById: async (id: number): Promise<Type | null> =>
    await prisma.type.findUnique({
      where: { id: id },
    }),
  findByCode: async (code: string): Promise<Type | null> =>
    await prisma.type.findUnique({
      where: { code: code },
    }),
  create: async (data: TypeCreatePayload): Promise<Type> =>
    await prisma.type.create({
      data: data,
    }),
  createMany: async (data: TypeCreatePayload[]): Promise<{ count: number }> =>
    await prisma.type.createMany({ data: data }),
  delete: async (id: number): Promise<Type> => await prisma.type.delete({ where: { id: id } }),
};
