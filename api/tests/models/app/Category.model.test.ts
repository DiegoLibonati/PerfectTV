import { Category as CategoryT } from "@app/entities/models";

import Category from "@app/models/app/Category.model";

describe("Category.model.ts", () => {
  const categoryTest: CategoryT = {
    id: 1,
    code: "test",
    description: "description test",
    channels: [
      {
        id: 2,
        name: "name",
        description: "description",
        thumbUrl: "https://logo.com/pepe.png",
        url: "urlcito",
        number: 23,
        type: {
          id: 1,
          code: "ft",
          description: "description test",
        },
        category: {
          id: 12,
          code: "ft cat",
          description: "description test cat",
        },
        source: {
          id: 15,
          code: "ft source ",
          description: "description test source",
        },
      },
    ],
  };

  describe("General Tests.", () => {
    test("It must initialize the class correctly.", () => {
      const category = new Category(
        categoryTest.id,
        categoryTest.code,
        categoryTest.description,
        categoryTest.channels
      );

      expect(categoryTest.id).toEqual(category.id);
      expect(categoryTest.code).toEqual(category.code);
      expect(categoryTest.description).toEqual(category.description);
      expect(categoryTest.channels).toEqual(category.channels);
    });
  });
});
