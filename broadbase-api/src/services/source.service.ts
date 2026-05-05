import type { SourceCreatePayload } from "@/types/payloads";
import type { SourceWithRelations } from "@/types/app";

import { SourceDAO } from "@/daos/source.dao";

export const SourceService = {
  getAllSources: async (): Promise<SourceWithRelations[]> => {
    return await SourceDAO.findMany();
  },
  getSourceById: async (id: number): Promise<SourceWithRelations | null> => {
    return await SourceDAO.findById(id);
  },
  getSourceByCode: async (code: string): Promise<SourceWithRelations | null> => {
    return await SourceDAO.findByCode(code);
  },
  getSourcesByCodes: async (codes: string[]): Promise<SourceWithRelations[]> => {
    return await SourceDAO.findByCodes(codes);
  },
  createSource: async (data: SourceCreatePayload): Promise<SourceWithRelations> => {
    return await SourceDAO.create(data);
  },
  createManySources: async (data: SourceCreatePayload[]): Promise<{ count: number }> => {
    return await SourceDAO.createMany(data);
  },
  deleteSource: async (id: number): Promise<SourceWithRelations> => {
    return await SourceDAO.delete(id);
  },
};
