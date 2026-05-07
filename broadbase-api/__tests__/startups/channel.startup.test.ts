import type { ChannelCreatePayload } from "@/types/payloads";

import { ChannelsStartUp } from "@/startups/channel.startup";

import { ChannelService } from "@/services/channel.service";

jest.mock("@/services/channel.service");

const mockPayload: ChannelCreatePayload[] = [
  {
    name: "Test Channel",
    description: "Test",
    thumbUrl: "https://example.com/thumb.jpg",
    url: "https://example.com/stream",
    urlRest: null,
    number: 1,
    idType: 1,
    idCategory: 1,
    idSource: 1,
  },
];

describe("channel.startup", () => {
  describe("ChannelsStartUp", () => {
    it("should call createManyChannels with the provided payload", async () => {
      (ChannelService.createManyChannels as jest.Mock).mockResolvedValue({ count: 1 });

      await ChannelsStartUp(mockPayload);

      expect(ChannelService.createManyChannels).toHaveBeenCalledWith(mockPayload);
    });

    it("should handle empty payload", async () => {
      (ChannelService.createManyChannels as jest.Mock).mockResolvedValue({ count: 0 });

      await ChannelsStartUp([]);

      expect(ChannelService.createManyChannels).toHaveBeenCalledWith([]);
    });

    it("should throw when createManyChannels throws", async () => {
      (ChannelService.createManyChannels as jest.Mock).mockRejectedValue(new Error("DB error"));

      await expect(ChannelsStartUp(mockPayload)).rejects.toThrow("DB error");
    });
  });
});
