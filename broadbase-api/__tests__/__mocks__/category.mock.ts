import type { Category } from "@prisma/client";
import type { CategoryWithRelations } from "@/types/app";

export const mockCategoryWithRelations: CategoryWithRelations = {
  id: 1,
  code: "news",
  description: "News channels",
  channels: [],
};

export const mockCategory: Category = { id: 1, code: "news", description: "News" };
