import { Category } from "@app/entities/models";

import categoryRepository from "@app/models/dataAccess/CategoryRepository.model";

describe("CategoryRepository.model.ts", () => {
  const categoryTest: Pick<Category, "code" | "description"> = {
    code: "codeTestCategoryRepository.model.ts",
    description: "code test CategoryRepository.model.ts",
  };
  const categoriesTest: Pick<Category, "code" | "description">[] = [
    {
      code: "codeTest2CategoryRepository.model.ts",
      description: "code test 2 CategoryRepository.model.ts",
    },
  ];

  describe("General Tests.", () => {
    test("It must create a new category.", async () => {
      const cat = await categoryRepository.createCategory(
        categoryTest.code,
        categoryTest.description
      );

      expect(cat.id).toBeTruthy();
      expect(cat.code).toEqual(categoryTest.code);
      expect(cat.description).toEqual(categoryTest.description);
    });

    test("It must obtain all categories.", async () => {
      const categories = await categoryRepository.getCategories();

      expect(categories.length > 0).toBeTruthy();
      expect(categories.find((c) => c.code === categoryTest.code)).toBeTruthy();
    });

    test("It must get one category per code.", async () => {
      const cat = await categoryRepository.getCategoryByCode(categoryTest.code);

      expect(cat!.id).toBeTruthy();
      expect(cat!.code).toEqual(categoryTest.code);
      expect(cat!.description).toEqual(categoryTest.description);
    });

    test("It must get one category per id.", async () => {
      const catByCode = await categoryRepository.getCategoryByCode(
        categoryTest.code
      );
      const cat = await categoryRepository.getCategoryById(catByCode!.id);

      expect(cat!.id).toBeTruthy();
      expect(cat!.code).toEqual(categoryTest.code);
      expect(cat!.description).toEqual(categoryTest.description);
    });

    test("It must add multiple categories through an array.", async () => {
      const cats = await categoryRepository.createCategories(categoriesTest);

      expect(cats.count).toEqual(1);
    });

    test("It must delete all test categories created.", () => {
      categoriesTest.push(categoryTest);

      categoriesTest.forEach(async (c) => {
        const catByCode = await categoryRepository.getCategoryByCode(c.code);
        const categoryDeleted = await categoryRepository.deleteCategory(
          catByCode!.id
        );

        expect(categoryDeleted!.id).toBeTruthy();
        expect(categoryDeleted!.code).toEqual(c.code);
        expect(categoryDeleted!.description).toEqual(c.description);
      });
    });
  });
});
