import type { Channel } from "@/types/app";

import { getChannelsSortByNumber } from "@/helpers/getChannelsSortByNumber";

import { mockChannel, mockChannel2, mockChannel3 } from "@tests/__mocks__/channel.mock";

describe("getChannelsSortByNumber", () => {
  describe("when channels are unsorted", () => {
    it("should return channels sorted by number in ascending order", () => {
      const result = getChannelsSortByNumber([mockChannel2, mockChannel3, mockChannel]);
      expect(result[0]!.number).toBe(1);
      expect(result[1]!.number).toBe(2);
      expect(result[2]!.number).toBe(3);
    });

    it("should not mutate the original array", () => {
      const channels = [mockChannel2, mockChannel3, mockChannel];
      const original = [...channels];
      getChannelsSortByNumber(channels);
      expect(channels).toEqual(original);
    });
  });

  describe("when channels are already sorted", () => {
    it("should return them in the same sorted order", () => {
      const sorted = [mockChannel, mockChannel3, mockChannel2];
      const result = getChannelsSortByNumber(sorted);
      expect(result[0]!.number).toBe(1);
      expect(result[1]!.number).toBe(2);
      expect(result[2]!.number).toBe(3);
    });
  });

  describe("when the array is empty", () => {
    it("should return an empty array", () => {
      const result = getChannelsSortByNumber([]);
      expect(result).toEqual([]);
    });
  });

  describe("when the array has a single channel", () => {
    it("should return an array with that channel", () => {
      const result = getChannelsSortByNumber([mockChannel]);
      expect(result).toHaveLength(1);
      expect(result[0]!.number).toBe(mockChannel.number);
    });
  });

  describe("when channels have the same number", () => {
    it("should return all channels without removing duplicates", () => {
      const duplicate: Channel = { ...mockChannel, id: 99, number: 1 };
      const result = getChannelsSortByNumber([mockChannel, duplicate]);
      expect(result).toHaveLength(2);
    });
  });
});
