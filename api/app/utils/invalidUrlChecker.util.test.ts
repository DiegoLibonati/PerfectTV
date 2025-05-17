import { Channel } from "@app/entities/models";

import { invalidUrlChecker } from "@app/utils/invalidUrlChecker.util";

describe("invalidUrlChecker.util.ts", () => {
  describe("If all urls are valid.", () => {
    const channels: Channel[] = [
      {
        id: 2,
        name: "name",
        description: "description",
        thumbUrl: "https://logo.com/pepe.png",
        url: "https://url.com",
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
          code: "ft source",
          description: "description test source",
        },
      },
    ];

    test("It must return false.", () => {
      const anyUrlInvalid = invalidUrlChecker(channels);

      expect(anyUrlInvalid).toBeFalsy();
    });
  });

  describe("If any url is not valid.", () => {
    const channels: Channel[] = [
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
          code: "ft source",
          description: "description test source",
        },
      },
    ];

    test("It must return true.", () => {
      const anyUrlInvalid = invalidUrlChecker(channels);

      expect(anyUrlInvalid).toBeTruthy();
    });
  });
});
