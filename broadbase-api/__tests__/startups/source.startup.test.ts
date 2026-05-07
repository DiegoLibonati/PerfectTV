import type { SourceCreatePayload } from "@/types/payloads";

import { SourcesStartUp } from "@/startups/source.startup";

import { SourceService } from "@/services/source.service";

jest.mock("@/services/source.service");

describe("source.startup", () => {
  describe("SourcesStartUp", () => {
    it("should call createManySources with the provided payload", async () => {
      (SourceService.createManySources as jest.Mock).mockResolvedValue({ count: 3 });
      const payload: SourceCreatePayload[] = [
        { code: "youtube", description: "YouTube" },
        { code: "twitch", description: "Twitch" },
        { code: "ftv", description: "FTV" },
      ];

      await SourcesStartUp(payload);

      expect(SourceService.createManySources).toHaveBeenCalledWith(payload);
    });

    it("should handle empty payload", async () => {
      (SourceService.createManySources as jest.Mock).mockResolvedValue({ count: 0 });

      await SourcesStartUp([]);

      expect(SourceService.createManySources).toHaveBeenCalledWith([]);
    });

    it("should throw when createManySources throws", async () => {
      (SourceService.createManySources as jest.Mock).mockRejectedValue(new Error("DB error"));

      await expect(SourcesStartUp([{ code: "youtube", description: "YouTube" }])).rejects.toThrow(
        "DB error"
      );
    });
  });
});
