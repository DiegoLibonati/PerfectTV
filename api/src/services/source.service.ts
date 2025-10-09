import { SourceFlat } from "@src/entities/app";

import { SourceDAO } from "@src/daos/source.dao";

export const SourceService = {
  getAllSources: async () => {
    return await SourceDAO.findMany();
  },
  getSourceById: async (id: number) => {
    return await SourceDAO.findById(id);
  },
  getSourceByCode: async (code: string) => {
    return await SourceDAO.findByCode(code);
  },
  createSource: async (data: SourceFlat) => {
    return await SourceDAO.create(data);
  },
  createManySources: async (data: SourceFlat[]) => {
    return await SourceDAO.createMany(data);
  },
  deleteSource: async (id: number) => {
    return await SourceDAO.delete(id);
  },
};
