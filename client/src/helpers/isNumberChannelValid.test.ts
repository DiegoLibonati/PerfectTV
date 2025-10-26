import { describe, expect, test } from "vitest";

import { isNumberChannelValid } from "@src/helpers/isNumberChannelValid";

describe("isNumberChannelValid.ts", () => {
  describe("If checking if a channel number is valid.", () => {
    test("It should return true if the number is in the list", () => {
      const numbers = [1, 2, 3, 4, 5];
      const number = 3;

      const result = isNumberChannelValid(numbers, number);

      expect(result).toBe(true);
    });

    test("It should return false if the number is not in the list", () => {
      const numbers = [1, 2, 3, 4, 5];
      const number = 6;

      const result = isNumberChannelValid(numbers, number);

      expect(result).toBe(false);
    });

    test("It should return false if the list is empty", () => {
      const numbers: number[] = [];
      const number = 1;

      const result = isNumberChannelValid(numbers, number);

      expect(result).toBe(false);
    });

    test("It should return true if the number is the only one in the list", () => {
      const numbers = [5];
      const number = 5;

      const result = isNumberChannelValid(numbers, number);

      expect(result).toBe(true);
    });

    test("It should return false if the number is not in the list with duplicates", () => {
      const numbers = [1, 1, 2, 3];
      const number = 4;

      const result = isNumberChannelValid(numbers, number);

      expect(result).toBe(false);
    });
  });
});
