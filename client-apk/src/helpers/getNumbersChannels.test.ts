import { describe, expect, test } from "vitest";

import { Channel } from "@src/entities/api";

import { getNumbersChannels } from "@src/helpers/getNumbersChannels";

describe("getNumbersChannels.ts", () => {
  describe("If extracting and sorting channel numbers.", () => {
    test("It should return the numbers sorted in ascending order", () => {
      const numberChannels = [
        { id: 1, number: 3 },
        { id: 2, number: 1 },
        { id: 3, number: 2 },
      ];

      const result = getNumbersChannels(numberChannels);

      expect(result).toEqual([1, 2, 3]);
    });

    test("It should return an empty array if no channels are provided", () => {
      const numberChannels: Pick<Channel, "id" | "number">[] = [];

      const result = getNumbersChannels(numberChannels);

      expect(result).toEqual([]);
    });

    test("It should return a single number if only one channel is provided", () => {
      const numberChannels = [{ id: 1, number: 5 }];

      const result = getNumbersChannels(numberChannels);

      expect(result).toEqual([5]);
    });

    test("It should handle duplicate numbers", () => {
      const numberChannels = [
        { id: 1, number: 3 },
        { id: 2, number: 3 },
        { id: 3, number: 1 },
      ];

      const result = getNumbersChannels(numberChannels);

      expect(result).toEqual([1, 3, 3]);
    });

    test("It should handle negative numbers correctly", () => {
      const numberChannels = [
        { id: 1, number: -1 },
        { id: 2, number: 0 },
        { id: 3, number: -3 },
      ];

      const result = getNumbersChannels(numberChannels);

      expect(result).toEqual([-3, -1, 0]);
    });
  });
});
