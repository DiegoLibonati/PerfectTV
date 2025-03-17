import { Source as SourceT } from "@app/entities/models";

import Source from "@app/models/app/Source.model";

describe("Source.model.ts", () => {
  const sourceTest: SourceT = {
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
      const source = new Source(
        sourceTest.id,
        sourceTest.code,
        sourceTest.description,
        sourceTest.channels
      );

      expect(sourceTest.id).toEqual(source.id);
      expect(sourceTest.code).toEqual(source.code);
      expect(sourceTest.description).toEqual(source.description);
      expect(sourceTest.channels).toEqual(source.channels);
    });
  });
});
