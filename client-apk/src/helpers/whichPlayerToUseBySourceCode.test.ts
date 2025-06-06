import { describe, expect, test } from "vitest";

import { whichPlayerToUseBySourceCode } from "@src/helpers/whichPlayerToUseBySourceCode";

describe("whichPlayerToUseBySourceCode.ts", () => {
  describe("If determining which player to use by source code.", () => {
    test('It should return "iframe" for "ftv"', () => {
      const sourceCode = "ftv";

      const result = whichPlayerToUseBySourceCode(sourceCode);

      expect(result).toBe("iframe");
    });

    test('It should return "iframe" for "youtube"', () => {
      const sourceCode = "youtube";

      const result = whichPlayerToUseBySourceCode(sourceCode);

      expect(result).toBe("iframe");
    });

    test('It should return "react-player" for "vimeo"', () => {
      const sourceCode = "vimeo";

      const result = whichPlayerToUseBySourceCode(sourceCode);

      expect(result).toBe("react-player");
    });

    test('It should return "react-player" for "Dailymotion"', () => {
      const sourceCode = "Dailymotion";

      const result = whichPlayerToUseBySourceCode(sourceCode);

      expect(result).toBe("react-player");
    });

    test('It should return "react-player" for any source code not in the iframe list', () => {
      const sourceCode = "otherSource";

      const result = whichPlayerToUseBySourceCode(sourceCode);

      expect(result).toBe("react-player");
    });
  });
});
