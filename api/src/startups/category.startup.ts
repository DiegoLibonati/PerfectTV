import { CategoryFlat } from "@src/entities/app";

import { CategoryService } from "@src/services/category.service";

export const CategoriesStartUp = async (
  categoriesFlat: CategoryFlat[]
): Promise<void> => {
  const categories = await CategoryService.getAllCategories();

  if (categories.length) return;

  await CategoryService.createManyCategories(categoriesFlat);
};
