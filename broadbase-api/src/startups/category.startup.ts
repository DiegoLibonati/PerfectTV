import type { CategoryCreatePayload } from "@/types/payloads";

import { CategoryService } from "@/services/category.service";

export const CategoriesStartUp = async (payload: CategoryCreatePayload[]): Promise<void> => {
  await CategoryService.createManyCategories(payload);
};
