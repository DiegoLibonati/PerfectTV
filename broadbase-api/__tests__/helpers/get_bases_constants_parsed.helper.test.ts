import type { BaseCreatePayload } from "@/types/payloads";
import type { DefaultBase } from "@/types/defaults";

import { getBasesConstantsParsed } from "@/helpers/get_bases_constants_parsed.helper";

import { SourceService } from "@/services/source.service";

import { mockTwitchSource, mockYoutubeSource } from "@tests/__mocks__/source.mock";

jest.mock("@/services/source.service");

describe("get_bases_constants_parsed.helper", () => {
  describe("getBasesConstantsParsed", () => {
    it("should map defaultBases to BaseCreatePayload using source IDs", async () => {
      (SourceService.getSourcesByCodes as jest.Mock).mockResolvedValue([mockYoutubeSource]);

      const defaultBases: DefaultBase[] = [
        { baseUrl: "https://www.youtube.com/embed/live_stream", codeSource: "youtube" },
      ];

      const result: BaseCreatePayload[] = await getBasesConstantsParsed(defaultBases);

      expect(SourceService.getSourcesByCodes).toHaveBeenCalledWith(["youtube"]);
      expect(result).toEqual([
        { baseUrl: "https://www.youtube.com/embed/live_stream", idSource: 10 },
      ]);
    });

    it("should deduplicate source codes before querying", async () => {
      (SourceService.getSourcesByCodes as jest.Mock).mockResolvedValue([mockYoutubeSource]);

      const defaultBases: DefaultBase[] = [
        { baseUrl: "https://youtube.com/embed1", codeSource: "youtube" },
        { baseUrl: "https://youtube.com/embed2", codeSource: "youtube" },
      ];

      await getBasesConstantsParsed(defaultBases);

      expect(SourceService.getSourcesByCodes).toHaveBeenCalledWith(["youtube"]);
    });

    it("should map multiple bases with different sources", async () => {
      (SourceService.getSourcesByCodes as jest.Mock).mockResolvedValue([
        mockYoutubeSource,
        mockTwitchSource,
      ]);

      const defaultBases: DefaultBase[] = [
        { baseUrl: "https://youtube.com/embed", codeSource: "youtube" },
        { baseUrl: "https://twitch.tv/embed", codeSource: "twitch" },
      ];

      const result: BaseCreatePayload[] = await getBasesConstantsParsed(defaultBases);

      expect(result).toEqual([
        { baseUrl: "https://youtube.com/embed", idSource: 10 },
        { baseUrl: "https://twitch.tv/embed", idSource: 20 },
      ]);
    });
  });
});
