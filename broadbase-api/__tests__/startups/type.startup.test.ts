import type { TypeCreatePayload } from "@/types/payloads";

import { TypesStartUp } from "@/startups/type.startup";

import { TypeService } from "@/services/type.service";

jest.mock("@/services/type.service");

describe("type.startup", () => {
  describe("TypesStartUp", () => {
    it("should call createManyTypes with the provided payload", async () => {
      (TypeService.createManyTypes as jest.Mock).mockResolvedValue({ count: 2 });
      const payload: TypeCreatePayload[] = [
        { code: "public", description: "Public channels" },
        { code: "private", description: "Private channels" },
      ];

      await TypesStartUp(payload);

      expect(TypeService.createManyTypes).toHaveBeenCalledWith(payload);
    });

    it("should handle empty payload", async () => {
      (TypeService.createManyTypes as jest.Mock).mockResolvedValue({ count: 0 });

      await TypesStartUp([]);

      expect(TypeService.createManyTypes).toHaveBeenCalledWith([]);
    });

    it("should throw when createManyTypes throws", async () => {
      (TypeService.createManyTypes as jest.Mock).mockRejectedValue(new Error("DB error"));

      await expect(TypesStartUp([{ code: "public", description: "Public" }])).rejects.toThrow(
        "DB error"
      );
    });
  });
});
