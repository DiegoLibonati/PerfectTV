import { Channel } from "@src/entities/app";

import { setChannelUrl } from "@src/helpers/set_channel_url.helper";
import { ChannelService } from "@src/services/channel.service";

jest.mock("@src/services/channel.service");

describe("set_channel_url.helper.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("It should update the channel url combining baseUrl and urlRest", async () => {
    const mockChannel: Channel = {
      id: 10,
      name: "Test Channel",
      description: "Test description",
      thumbUrl: "https://example.com/thumb.jpg",
      url: "",
      urlRest: "/stream/test.m3u8",
      number: 99,
      idType: 1,
      idCategory: 2,
      idSource: 3,
      type: { id: 1, code: "TYPE", description: "Test Type" },
      category: { id: 2, code: "CAT", description: "Test Category" },
      source: { id: 3, code: "SRC", description: "Test Source" },
    };

    const mockUpdatedChannel = {
      ...mockChannel,
      url: "https://cdn.example.com/stream/test.m3u8",
    };

    (ChannelService.updateChannel as jest.Mock).mockResolvedValue(
      mockUpdatedChannel
    );

    const result = await setChannelUrl(mockChannel, "https://cdn.example.com");

    expect(ChannelService.updateChannel).toHaveBeenCalledWith(10, {
      url: "https://cdn.example.com/stream/test.m3u8",
    });
    expect(result).toEqual(mockUpdatedChannel);
  });

  test("It should throw an error if ChannelService.updateChannel fails", async () => {
    const mockChannel: Channel = {
      id: 5,
      name: "Broken Channel",
      description: "Desc",
      thumbUrl: "thumb",
      url: "",
      urlRest: "/fail",
      number: 5,
      idType: 1,
      idCategory: 1,
      idSource: 1,
      type: { id: 1, code: "TYPE", description: "Type" },
      category: { id: 1, code: "CAT", description: "Cat" },
      source: { id: 1, code: "SRC", description: "Src" },
    };

    (ChannelService.updateChannel as jest.Mock).mockRejectedValue(
      new Error("Update failed")
    );

    await expect(
      setChannelUrl(mockChannel, "https://cdn.fail.com")
    ).rejects.toThrow("Update failed");

    expect(ChannelService.updateChannel).toHaveBeenCalledWith(5, {
      url: "https://cdn.fail.com/fail",
    });
  });
});
