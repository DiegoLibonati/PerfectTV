import type { Source } from "@prisma/client";
import type { SourceCreatePayload } from "@/types/payloads";

import { SourceDAO } from "@/daos/source.dao";

export const SourceService = {
  getAllSources: async (): Promise<Source[]> => {
    return await SourceDAO.findMany();
  },
  getSourceById: async (id: number): Promise<Source | null> => {
    return await SourceDAO.findById(id);
  },
  getSourceByCode: async (code: string): Promise<Source | null> => {
    return await SourceDAO.findByCode(code);
  },
  getSourcesByCodes: async (codes: string[]): Promise<Source[]> => {
    return await SourceDAO.findByCodes(codes);
  },
  createSource: async (data: SourceCreatePayload): Promise<Source> => {
    return await SourceDAO.create(data);
  },
  createManySources: async (
    data: SourceCreatePayload[]
  ): Promise<{ count: number }> => {
    return await SourceDAO.createMany(data);
  },
  deleteSource: async (id: number): Promise<Source> => {
    return await SourceDAO.delete(id);
  },
};
