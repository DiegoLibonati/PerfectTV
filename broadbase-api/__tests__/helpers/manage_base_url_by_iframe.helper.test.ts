import { manageBaseUrlByIframe } from "@/helpers/manage_base_url_by_iframe.helper";

import { getSrcByIframe } from "@/helpers/get_src_by_iframe.helper";

import { BaseService } from "@/services/base.service";

import { mockBaseWithRelationsFtv } from "@tests/__mocks__/base.mock";

jest.mock("@/helpers/get_src_by_iframe.helper");
jest.mock("@/services/base.service");

describe("manage_base_url_by_iframe.helper", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {
      // Empty fn
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("manageBaseUrlByIframe", () => {
    it("should extract base URL, upsert it, and return true", async () => {
      (getSrcByIframe as jest.Mock).mockResolvedValue(
        "https://example.com/embed?channel=abc&token=xyz"
      );
      (BaseService.upsertBaseByIdSource as jest.Mock).mockResolvedValue(mockBaseWithRelationsFtv);

      const result: boolean = await manageBaseUrlByIframe("https://ftv.com/channel/1", 5);

      expect(getSrcByIframe).toHaveBeenCalledWith("https://ftv.com/channel/1");
      expect(BaseService.upsertBaseByIdSource).toHaveBeenCalledWith(5, "https://example.com/embed");
      expect(result).toBe(true);
    });

    it("should strip query string from srcUrl when building baseUrl", async () => {
      (getSrcByIframe as jest.Mock).mockResolvedValue(
        "https://stream.example.com/live?token=secret&v=1"
      );
      (BaseService.upsertBaseByIdSource as jest.Mock).mockResolvedValue(mockBaseWithRelationsFtv);

      await manageBaseUrlByIframe("https://ftv.example.com", 3);

      expect(BaseService.upsertBaseByIdSource).toHaveBeenCalledWith(
        3,
        "https://stream.example.com/live"
      );
    });

    it("should keep the full URL when there is no query string", async () => {
      (getSrcByIframe as jest.Mock).mockResolvedValue("https://example.com/embed");
      (BaseService.upsertBaseByIdSource as jest.Mock).mockResolvedValue(mockBaseWithRelationsFtv);

      await manageBaseUrlByIframe("https://ftv.com", 5);

      expect(BaseService.upsertBaseByIdSource).toHaveBeenCalledWith(5, "https://example.com/embed");
    });

    it("should return false when getSrcByIframe throws", async () => {
      (getSrcByIframe as jest.Mock).mockRejectedValue(new Error("Puppeteer failed"));

      const result: boolean = await manageBaseUrlByIframe("https://broken.com", 1);

      expect(result).toBe(false);
      expect(BaseService.upsertBaseByIdSource).not.toHaveBeenCalled();
    });

    it("should return false when upsert throws", async () => {
      (getSrcByIframe as jest.Mock).mockResolvedValue("https://example.com/embed?q=1");
      (BaseService.upsertBaseByIdSource as jest.Mock).mockRejectedValue(new Error("DB error"));

      const result: boolean = await manageBaseUrlByIframe("https://ftv.com", 2);

      expect(result).toBe(false);
    });
  });
});
