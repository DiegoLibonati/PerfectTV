import { BaseFlat, PartialBaseFlat } from "@src/entities/app";

import { BaseDAO } from "@src/daos/base.dao";

export const BaseService = {
  getAllBases: async () => {
    return await BaseDAO.findMany();
  },
  getBaseById: async (id: number) => {
    return await BaseDAO.findById(id);
  },
  getBaseByIdSource: async (idSource: number) => {
    return await BaseDAO.findByIdSource(idSource);
  },
  createBase: async (data: BaseFlat) => {
    return await BaseDAO.create(data);
  },
  createManyBases: async (data: BaseFlat[]) => {
    return await BaseDAO.createMany(data);
  },
  updateBase: async (id: number, data: PartialBaseFlat) => {
    return await BaseDAO.update(id, data);
  },
  deleteBase: async (id: number) => {
    return await BaseDAO.delete(id);
  },
};
