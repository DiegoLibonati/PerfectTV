import type { ChannelCreatePayload } from "@/types/payloads";
import type { DefaultChannel } from "@/types/defaults";

import { getChannelsConstantsParsed } from "@/helpers/get_channels_constants_parsed.helper";

import { TypeService } from "@/services/type.service";
import { CategoryService } from "@/services/category.service";
import { SourceService } from "@/services/source.service";

import { mockType, mockTypePrivate } from "@tests/__mocks__/type.mock";
import { mockCategoryWithRelations } from "@tests/__mocks__/category.mock";
import { mockSourceWithRelations } from "@tests/__mocks__/source.mock";

jest.mock("@/services/type.service");
jest.mock("@/services/category.service");
jest.mock("@/services/source.service");

const defaultChannel: DefaultChannel = {
  name: "Test Channel",
  description: "A test channel",
  thumbUrl: "https://example.com/thumb.jpg",
  url: "https://www.youtube.com/embed/live_stream?channel=abc",
  urlRest: "?channel=abc",
  number: 1,
  codeType: "public",
  codeCategory: "news",
  codeSource: "youtube",
};

describe("get_channels_constants_parsed.helper", () => {
  describe("getChannelsConstantsParsed", () => {
    it("should map defaultChannels to ChannelCreatePayload using entity IDs", async () => {
      (TypeService.getAllTypes as jest.Mock).mockResolvedValue([mockType]);
      (CategoryService.getAllCategories as jest.Mock).mockResolvedValue([
        mockCategoryWithRelations,
      ]);
      (SourceService.getAllSources as jest.Mock).mockResolvedValue([mockSourceWithRelations]);

      const result: ChannelCreatePayload[] = await getChannelsConstantsParsed([defaultChannel]);

      expect(TypeService.getAllTypes).toHaveBeenCalledTimes(1);
      expect(CategoryService.getAllCategories).toHaveBeenCalledTimes(1);
      expect(SourceService.getAllSources).toHaveBeenCalledTimes(1);
      expect(result).toEqual([
        {
          name: "Test Channel",
          description: "A test channel",
          thumbUrl: "https://example.com/thumb.jpg",
          url: "https://www.youtube.com/embed/live_stream?channel=abc",
          urlRest: "?channel=abc",
          number: 1,
          idType: 1,
          idCategory: 1,
          idSource: 1,
        },
      ]);
    });

    it("should map multiple channels with different types", async () => {
      (TypeService.getAllTypes as jest.Mock).mockResolvedValue([mockType, mockTypePrivate]);
      (CategoryService.getAllCategories as jest.Mock).mockResolvedValue([
        mockCategoryWithRelations,
      ]);
      (SourceService.getAllSources as jest.Mock).mockResolvedValue([mockSourceWithRelations]);

      const channels: DefaultChannel[] = [
        defaultChannel,
        { ...defaultChannel, name: "Channel 2", number: 2, codeType: "private" },
      ];

      const result: ChannelCreatePayload[] = await getChannelsConstantsParsed(channels);

      expect(result).toHaveLength(2);
      expect(result[0]!.idType).toBe(1);
      expect(result[1]!.idType).toBe(2);
    });

    it("should return empty array for empty defaultChannels", async () => {
      (TypeService.getAllTypes as jest.Mock).mockResolvedValue([mockType]);
      (CategoryService.getAllCategories as jest.Mock).mockResolvedValue([
        mockCategoryWithRelations,
      ]);
      (SourceService.getAllSources as jest.Mock).mockResolvedValue([mockSourceWithRelations]);

      const result: ChannelCreatePayload[] = await getChannelsConstantsParsed([]);

      expect(result).toEqual([]);
    });
  });
});
