import type { BaseCreatePayload } from "@/types/payloads";

import { BasesStartUp } from "@/startups/base.startup";

import { BaseService } from "@/services/base.service";

jest.mock("@/services/base.service");

describe("base.startup", () => {
  describe("BasesStartUp", () => {
    it("should call createManyBases with the provided payload", async () => {
      (BaseService.createManyBases as jest.Mock).mockResolvedValue({ count: 1 });
      const payload: BaseCreatePayload[] = [{ baseUrl: "https://youtube.com/embed", idSource: 1 }];

      await BasesStartUp(payload);

      expect(BaseService.createManyBases).toHaveBeenCalledWith(payload);
    });

    it("should handle empty payload", async () => {
      (BaseService.createManyBases as jest.Mock).mockResolvedValue({ count: 0 });

      await BasesStartUp([]);

      expect(BaseService.createManyBases).toHaveBeenCalledWith([]);
    });

    it("should throw when createManyBases throws", async () => {
      (BaseService.createManyBases as jest.Mock).mockRejectedValue(new Error("DB error"));

      await expect(BasesStartUp([{ baseUrl: "https://a.com", idSource: 1 }])).rejects.toThrow(
        "DB error"
      );
    });
  });
});
