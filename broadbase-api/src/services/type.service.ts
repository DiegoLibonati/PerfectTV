import type { Type } from "@prisma/client";
import type { TypeCreatePayload } from "@/types/payloads";

import { TypeDAO } from "@/daos/type.dao";

export const TypeService = {
  getAllTypes: async (): Promise<Type[]> => {
    return await TypeDAO.findMany();
  },
  getTypeById: async (id: number): Promise<Type | null> => {
    return await TypeDAO.findById(id);
  },
  getTypeByCode: async (code: string): Promise<Type | null> => {
    return await TypeDAO.findByCode(code);
  },
  createType: async (data: TypeCreatePayload): Promise<Type> => {
    return await TypeDAO.create(data);
  },
  createManyTypes: async (data: TypeCreatePayload[]): Promise<{ count: number }> => {
    return await TypeDAO.createMany(data);
  },
  deleteType: async (id: number): Promise<Type> => {
    return await TypeDAO.delete(id);
  },
};
