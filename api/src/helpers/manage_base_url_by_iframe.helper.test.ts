import { manageBaseUrlByIframe } from "@src/helpers/manage_base_url_by_iframe.helper";
import { getSrcByIframe } from "@src/helpers/get_src_by_iframe.helper";

import { BaseService } from "@src/services/base.service";

jest.mock("@src/helpers/get_src_by_iframe.helper");
jest.mock("@src/services/base.service");

describe("manageBaseUrlByIframe.helper.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("It should create a new base if it does not exist", async () => {
    (getSrcByIframe as jest.Mock).mockResolvedValue(
      "https://example.com/base?param=value"
    );
    (BaseService.getBaseByIdSource as jest.Mock).mockResolvedValue(null);
    (BaseService.createBase as jest.Mock).mockResolvedValue({
      id: 1,
      baseUrl: "https://example.com/base",
      idSource: 5,
    });

    const result = await manageBaseUrlByIframe("https://iframe.url", 5);

    expect(getSrcByIframe).toHaveBeenCalledWith("https://iframe.url");
    expect(BaseService.getBaseByIdSource).toHaveBeenCalledWith(5);
    expect(BaseService.createBase).toHaveBeenCalledWith({
      baseUrl: "https://example.com/base",
      idSource: 5,
    });
    expect(result).toBe(true);
  });

  test("It should update base if it already exists", async () => {
    (getSrcByIframe as jest.Mock).mockResolvedValue(
      "https://updated.com/newbase?time=123"
    );
    (BaseService.getBaseByIdSource as jest.Mock).mockResolvedValue({
      id: 10,
      baseUrl: "https://old.com/base",
      idSource: 9,
    });
    (BaseService.updateBase as jest.Mock).mockResolvedValue({
      id: 10,
      baseUrl: "https://updated.com/newbase",
      idSource: 9,
    });

    const result = await manageBaseUrlByIframe("https://iframe.other", 9);

    expect(getSrcByIframe).toHaveBeenCalledWith("https://iframe.other");
    expect(BaseService.updateBase).toHaveBeenCalledWith(10, {
      baseUrl: "https://updated.com/newbase",
    });
    expect(result).toBe(true);
  });

  test("It should return false if any error occurs", async () => {
    (getSrcByIframe as jest.Mock).mockRejectedValue(
      new Error("Iframe fetch failed")
    );

    const result = await manageBaseUrlByIframe("https://broken.url", 3);

    expect(getSrcByIframe).toHaveBeenCalledWith("https://broken.url");
    expect(result).toBe(false);
  });
});
