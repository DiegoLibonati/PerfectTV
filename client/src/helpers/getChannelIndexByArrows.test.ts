import { describe, expect, test } from "vitest";

import { getChannelIndexByArrows } from "@src/helpers/getChannelIndexByArrows";

describe("getChannelIndexByArrows.ts", () => {
  describe("If navigating horizontally.", () => {
    test("It should return the correct index when moving right", () => {
      const key = "ArrowRight";
      const currentIndex = 2;
      const lastIndex = 4;

      const result = getChannelIndexByArrows(key, currentIndex, lastIndex);

      expect(result).toBe(3);
    });

    test("It should return index 0 when moving right past the last index", () => {
      const key = "ArrowRight";
      const currentIndex = 4;
      const lastIndex = 4;

      const result = getChannelIndexByArrows(key, currentIndex, lastIndex);

      expect(result).toBe(0);
    });

    test("It should return the correct index when moving left", () => {
      const key = "ArrowLeft";
      const currentIndex = 2;
      const lastIndex = 4;

      const result = getChannelIndexByArrows(key, currentIndex, lastIndex);

      expect(result).toBe(1);
    });

    test("It should return the last index when moving left past the first index", () => {
      const key = "ArrowLeft";
      const currentIndex = 0;
      const lastIndex = 4;

      const result = getChannelIndexByArrows(key, currentIndex, lastIndex);

      expect(result).toBe(4);
    });
  });
});
