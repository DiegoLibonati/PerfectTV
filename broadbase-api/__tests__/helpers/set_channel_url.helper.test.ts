import type { ChannelWithRelations } from "@/types/app";

import { setChannelUrl } from "@/helpers/set_channel_url.helper";

import { ChannelService } from "@/services/channel.service";

import { mockChannelWithRealations } from "@tests/__mocks__/channel.mock";

jest.mock("@/services/channel.service");

describe("set_channel_url.helper", () => {
  describe("setChannelUrl", () => {
    it("should update the channel URL combining baseUrl and urlRest", async () => {
      const updatedChannel: ChannelWithRelations = {
        ...mockChannelWithRealations,
        url: "https://new-base.com?channel=abc",
      };
      (ChannelService.updateChannel as jest.Mock).mockResolvedValue(updatedChannel);

      const result: ChannelWithRelations = await setChannelUrl(
        mockChannelWithRealations,
        "https://new-base.com"
      );

      expect(ChannelService.updateChannel).toHaveBeenCalledWith(1, {
        url: "https://new-base.com?channel=abc",
      });
      expect(result).toEqual(updatedChannel);
    });

    it("should call updateChannel with the channel ID", async () => {
      const channelWithId5: ChannelWithRelations = {
        ...mockChannelWithRealations,
        id: 5,
        urlRest: "/stream",
      };
      const updatedChannel: ChannelWithRelations = {
        ...channelWithId5,
        url: "https://base.com/stream",
      };
      (ChannelService.updateChannel as jest.Mock).mockResolvedValue(updatedChannel);

      await setChannelUrl(channelWithId5, "https://base.com");

      expect(ChannelService.updateChannel).toHaveBeenCalledWith(5, {
        url: "https://base.com/stream",
      });
    });
  });
});
