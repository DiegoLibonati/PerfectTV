import type { Category } from "@prisma/client";
import type { CategoryCreatePayload } from "@/types/payloads";

import { CategoryDAO } from "@/daos/category.dao";

export const CategoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    return await CategoryDAO.findMany();
  },
  getCategoryById: async (id: number): Promise<Category | null> => {
    return await CategoryDAO.findById(id);
  },
  getCategoryByCode: async (code: string): Promise<Category | null> => {
    return await CategoryDAO.findByCode(code);
  },
  createCategory: async (data: CategoryCreatePayload): Promise<Category> => {
    return await CategoryDAO.create(data);
  },
  createManyCategories: async (
    data: CategoryCreatePayload[]
  ): Promise<{ count: number }> => {
    return await CategoryDAO.createMany(data);
  },
  deleteCategory: async (id: number): Promise<Category> => {
    return await CategoryDAO.delete(id);
  },
};
