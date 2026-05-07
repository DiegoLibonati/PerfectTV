import { getNumbersChannels } from "@/helpers/getNumbersChannels";

describe("getNumbersChannels", () => {
  describe("when given a list of channels with numbers", () => {
    it("should return the numbers sorted in ascending order", () => {
      const channels = [
        { id: 1, number: 5 },
        { id: 2, number: 2 },
        { id: 3, number: 8 },
      ];
      const result = getNumbersChannels(channels);
      expect(result).toEqual([2, 5, 8]);
    });

    it("should return only numbers, not the full channel objects", () => {
      const channels = [{ id: 1, number: 3 }];
      const result = getNumbersChannels(channels);
      expect(result).toEqual([3]);
    });
  });

  describe("when given a single channel", () => {
    it("should return an array with its number", () => {
      const result = getNumbersChannels([{ id: 1, number: 10 }]);
      expect(result).toEqual([10]);
    });
  });

  describe("when given an empty array", () => {
    it("should return an empty array", () => {
      const result = getNumbersChannels([]);
      expect(result).toEqual([]);
    });
  });

  describe("when channels have the same number", () => {
    it("should include duplicates in the result", () => {
      const channels = [
        { id: 1, number: 5 },
        { id: 2, number: 5 },
      ];
      const result = getNumbersChannels(channels);
      expect(result).toHaveLength(2);
      expect(result).toEqual([5, 5]);
    });
  });
});
