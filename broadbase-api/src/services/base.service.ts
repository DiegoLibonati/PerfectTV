import type { Base } from "@prisma/client";
import type { BaseCreatePayload, BaseUpdatePayload } from "@/types/payloads";

import { BaseDAO } from "@/daos/base.dao";

export const BaseService = {
  getAllBases: async (): Promise<Base[]> => {
    return await BaseDAO.findMany();
  },
  getBaseById: async (id: number): Promise<Base | null> => {
    return await BaseDAO.findById(id);
  },
  getBaseByIdSource: async (idSource: number): Promise<Base | null> => {
    return await BaseDAO.findByIdSource(idSource);
  },
  createBase: async (data: BaseCreatePayload): Promise<Base> => {
    return await BaseDAO.create(data);
  },
  createManyBases: async (
    data: BaseCreatePayload[]
  ): Promise<{ count: number }> => {
    return await BaseDAO.createMany(data);
  },
  upsertBaseByIdSource: async (
    idSource: number,
    baseUrl: string
  ): Promise<Base> => {
    return await BaseDAO.upsertByIdSource(idSource, baseUrl);
  },
  updateBase: async (id: number, data: BaseUpdatePayload): Promise<Base> => {
    return await BaseDAO.update(id, data);
  },
  deleteBase: async (id: number): Promise<Base> => {
    return await BaseDAO.delete(id);
  },
};
