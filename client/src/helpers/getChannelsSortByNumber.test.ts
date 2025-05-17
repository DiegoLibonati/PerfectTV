import { describe, expect, test } from "vitest";

import { Channel } from "@src/entities/api";

import { getChannelsSortByNumber } from "@src/helpers/getChannelsSortByNumber";

describe("getChannelsSortByNumber.ts", () => {
  describe("If sorting channels by number.", () => {
    test("It should return channels sorted in ascending order by number", () => {
      const channels = [
        { id: 1, name: "Channel 1", number: 3 },
        { id: 2, name: "Channel 2", number: 1 },
        { id: 3, name: "Channel 3", number: 2 },
      ];

      const result = getChannelsSortByNumber(channels as Channel[]);

      expect(result).toEqual([
        { id: 2, name: "Channel 2", number: 1 },
        { id: 3, name: "Channel 3", number: 2 },
        { id: 1, name: "Channel 1", number: 3 },
      ]);
    });

    test("It should return an empty array if no channels are provided", () => {
      const channels: Channel[] = [];

      const result = getChannelsSortByNumber(channels);

      expect(result).toEqual([]);
    });

    test("It should return a single channel unchanged if only one channel is provided", () => {
      const channels = [{ id: 1, name: "Channel 1", number: 3 }];

      const result = getChannelsSortByNumber(channels as Channel[]);

      expect(result).toEqual([{ id: 1, name: "Channel 1", number: 3 }]);
    });
  });
});
