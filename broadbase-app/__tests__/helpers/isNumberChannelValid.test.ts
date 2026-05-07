import { isNumberChannelValid } from "@/helpers/isNumberChannelValid";

describe("isNumberChannelValid", () => {
  const numbers = [1, 5, 10, 42, 100];

  describe("when the number exists in the list", () => {
    it("should return true for the first number", () => {
      expect(isNumberChannelValid(numbers, 1)).toBe(true);
    });

    it("should return true for a number in the middle", () => {
      expect(isNumberChannelValid(numbers, 10)).toBe(true);
    });

    it("should return true for the last number", () => {
      expect(isNumberChannelValid(numbers, 100)).toBe(true);
    });
  });

  describe("when the number does not exist in the list", () => {
    it("should return false for a number not in the list", () => {
      expect(isNumberChannelValid(numbers, 2)).toBe(false);
    });

    it("should return false for zero", () => {
      expect(isNumberChannelValid(numbers, 0)).toBe(false);
    });

    it("should return false for a negative number", () => {
      expect(isNumberChannelValid(numbers, -1)).toBe(false);
    });
  });

  describe("when the numbers array is empty", () => {
    it("should return false", () => {
      expect(isNumberChannelValid([], 1)).toBe(false);
    });
  });
});
