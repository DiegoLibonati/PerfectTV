import { TypeFlat } from "@src/entities/app";

import { TypeDAO } from "@src/daos/type.dao";

export const TypeService = {
  getAllTypes: async () => {
    return await TypeDAO.findMany();
  },
  getTypeById: async (id: number) => {
    return await TypeDAO.findById(id);
  },
  getTypeByCode: async (code: string) => {
    return await TypeDAO.findByCode(code);
  },
  createType: async (data: TypeFlat) => {
    return await TypeDAO.create(data);
  },
  createManyTypes: async (data: TypeFlat[]) => {
    return await TypeDAO.createMany(data);
  },
  deleteType: async (id: number) => {
    return await TypeDAO.delete(id);
  },
};
