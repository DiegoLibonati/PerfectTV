import { Base as BaseT } from "@app/entities/models";

import Base from "@app/models/app/Base.model";

describe("Base.model.ts", () => {
  const baseTest: BaseT = {
    id: 1,
    baseUrl: "https://hola.com",
    source: {
      id: 15,
      code: "ft source ",
      description: "description test source",
    },
  };

  describe("General Tests.", () => {
    test("It must initialize the class correctly.", () => {
      const base = new Base(
        baseTest.id,
        baseTest.baseUrl,
        baseTest.source
      );

      expect(baseTest.id).toEqual(base.id);
      expect(baseTest.baseUrl).toEqual(base.baseUrl);
      expect(baseTest.source).toEqual(base.source);
    });
  });
});
