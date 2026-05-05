import type { BaseCreatePayload, BaseUpdatePayload } from "@/types/payloads";
import type { BaseWithRelations } from "@/types/app";

import { BaseDAO } from "@/daos/base.dao";

export const BaseService = {
  getAllBases: async (): Promise<BaseWithRelations[]> => {
    return await BaseDAO.findMany();
  },
  getBaseById: async (id: number): Promise<BaseWithRelations | null> => {
    return await BaseDAO.findById(id);
  },
  getBaseByIdSource: async (idSource: number): Promise<BaseWithRelations | null> => {
    return await BaseDAO.findByIdSource(idSource);
  },
  createBase: async (data: BaseCreatePayload): Promise<BaseWithRelations> => {
    return await BaseDAO.create(data);
  },
  createManyBases: async (data: BaseCreatePayload[]): Promise<{ count: number }> => {
    return await BaseDAO.createMany(data);
  },
  upsertBaseByIdSource: async (idSource: number, baseUrl: string): Promise<BaseWithRelations> => {
    return await BaseDAO.upsertByIdSource(idSource, baseUrl);
  },
  updateBase: async (id: number, data: BaseUpdatePayload): Promise<BaseWithRelations> => {
    return await BaseDAO.update(id, data);
  },
  deleteBase: async (id: number): Promise<BaseWithRelations> => {
    return await BaseDAO.delete(id);
  },
};
