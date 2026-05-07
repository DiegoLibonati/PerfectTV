import type { CategoryCreatePayload } from "@/types/payloads";

import { CategoriesStartUp } from "@/startups/category.startup";

import { CategoryService } from "@/services/category.service";

jest.mock("@/services/category.service");

describe("category.startup", () => {
  describe("CategoriesStartUp", () => {
    it("should call createManyCategories with the provided payload", async () => {
      (CategoryService.createManyCategories as jest.Mock).mockResolvedValue({ count: 2 });
      const payload: CategoryCreatePayload[] = [
        { code: "news", description: "News channels" },
        { code: "gameplays", description: "Gameplay channels" },
      ];

      await CategoriesStartUp(payload);

      expect(CategoryService.createManyCategories).toHaveBeenCalledWith(payload);
    });

    it("should handle empty payload", async () => {
      (CategoryService.createManyCategories as jest.Mock).mockResolvedValue({ count: 0 });

      await CategoriesStartUp([]);

      expect(CategoryService.createManyCategories).toHaveBeenCalledWith([]);
    });

    it("should throw when createManyCategories throws", async () => {
      (CategoryService.createManyCategories as jest.Mock).mockRejectedValue(new Error("DB error"));

      await expect(CategoriesStartUp([{ code: "news", description: "News" }])).rejects.toThrow(
        "DB error"
      );
    });
  });
});
