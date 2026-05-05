import type { CategoryCreatePayload } from "@/types/payloads";

import { CategoryService } from "@/services/category.service";

export const CategoriesStartUp = async (payload: CategoryCreatePayload[]): Promise<void> => {
  const categories = await CategoryService.getAllCategories();

  if (categories.length) return;

  await CategoryService.createManyCategories(payload);
};
