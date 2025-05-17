import { Channel } from "@app/entities/models";

import { sourceCodeChecker } from "@app/utils/sourceCodeChecker.util";

describe("sourceCodeChecker.util.ts", () => {
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

  describe("If the code exists in any channel.", () => {
    const codeToSearch = "ft source"

    test("It must return true.", () => {
        const sourceExistsInChannels = sourceCodeChecker(channels, codeToSearch)

        expect(sourceExistsInChannels).toBeTruthy()
    });
  });

  describe("If the code not exists in any channel.", () => {
    const codeToSearch = "test not exists code source"

    test("It must return false.", () => {
        const sourceExistsInChannels = sourceCodeChecker(channels, codeToSearch)

        expect(sourceExistsInChannels).toBeFalsy()
    });
  });
});
