import { CategoryFlat } from "@src/entities/app";

import { CategoryDAO } from "@src/daos/category.dao";

export const CategoryService = {
  getAllCategories: async () => {
    return await CategoryDAO.findMany();
  },
  getCategoryById: async (id: number) => {
    return await CategoryDAO.findById(id);
  },
  getCategoryByCode: async (code: string) => {
    return await CategoryDAO.findByCode(code);
  },
  createCategory: async (data: CategoryFlat) => {
    return await CategoryDAO.create(data);
  },
  createManyCategories: async (data: CategoryFlat[]) => {
    return await CategoryDAO.createMany(data);
  },
  deleteCategory: async (id: number) => {
    return await CategoryDAO.delete(id);
  },
};
