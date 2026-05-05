import type { CategoryCreatePayload } from "@/types/payloads";
import type { CategoryWithRelations } from "@/types/app";

import { CategoryDAO } from "@/daos/category.dao";

export const CategoryService = {
  getAllCategories: async (): Promise<CategoryWithRelations[]> => {
    return await CategoryDAO.findMany();
  },
  getCategoryById: async (id: number): Promise<CategoryWithRelations | null> => {
    return await CategoryDAO.findById(id);
  },
  getCategoryByCode: async (code: string): Promise<CategoryWithRelations | null> => {
    return await CategoryDAO.findByCode(code);
  },
  createCategory: async (data: CategoryCreatePayload): Promise<CategoryWithRelations> => {
    return await CategoryDAO.create(data);
  },
  createManyCategories: async (data: CategoryCreatePayload[]): Promise<{ count: number }> => {
    return await CategoryDAO.createMany(data);
  },
  deleteCategory: async (id: number): Promise<CategoryWithRelations> => {
    return await CategoryDAO.delete(id);
  },
};
