import { Type as TypeT } from "@app/entities/models";

import Type from "@app/models/app/Type.model";

describe("Type.model.ts", () => {
  const typeTest: TypeT = {
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
      const type = new Type(
        typeTest.id,
        typeTest.code,
        typeTest.description,
        typeTest.channels
      );

      expect(typeTest.id).toEqual(type.id);
      expect(typeTest.code).toEqual(type.code);
      expect(typeTest.description).toEqual(type.description);
      expect(typeTest.channels).toEqual(type.channels);
    });
  });
});
