import puppeteer from "puppeteer-core";

import { getSrcByIframe } from "@src/helpers/get_src_by_iframe.helper";
import { resolveFinalUrl } from "@src/helpers/resolve_final_url.helper";

jest.mock("puppeteer-core");
jest.mock("@src/helpers/resolve_final_url.helper");

describe("get_src_by_iframe.helper.ts", () => {
  const mockBrowser = {
    newPage: jest.fn(),
    close: jest.fn(),
  };

  const mockPage = {
    goto: jest.fn(),
    waitForSelector: jest.fn(),
    waitForFunction: jest.fn(),
    evaluate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (puppeteer.launch as jest.Mock).mockResolvedValue(mockBrowser);
    mockBrowser.newPage.mockResolvedValue(mockPage);
    (resolveFinalUrl as jest.Mock).mockResolvedValue("https://final.test.url");
  });

  test("It should return iframe src when iframe is found successfully", async () => {
    const iframeHandle = { contentFrame: jest.fn().mockResolvedValue({}) };
    mockPage.waitForSelector.mockResolvedValue(iframeHandle);
    mockPage.evaluate.mockResolvedValue("https://iframe.source.url");

    const result = await getSrcByIframe("https://original.url");

    expect(resolveFinalUrl).toHaveBeenCalledWith("https://original.url");
    expect(puppeteer.launch).toHaveBeenCalledWith(
      expect.objectContaining({
        headless: true,
      })
    );
    expect(mockPage.goto).toHaveBeenCalledWith(
      "https://final.test.url",
      expect.objectContaining({
        waitUntil: "networkidle2",
        timeout: 0,
      })
    );
    expect(mockPage.evaluate).toHaveBeenCalled();
    expect(result).toBe("https://iframe.source.url");
    expect(mockBrowser.close).toHaveBeenCalled();
  });

  test("It should throw an error if something fails while fetching iframe src", async () => {
    mockPage.goto.mockRejectedValueOnce(new Error("Navigation failed"));

    await expect(getSrcByIframe("https://broken.url")).rejects.toThrow(
      "Navigation failed"
    );

    expect(mockBrowser.close).toHaveBeenCalled();
  });

  test("It should close the browser even when an error occurs", async () => {
    mockPage.waitForSelector.mockImplementationOnce(() => {
      throw new Error("No iframe found");
    });

    await expect(getSrcByIframe("https://noiframe.url")).rejects.toThrow(
      "No iframe found"
    );

    expect(mockBrowser.close).toHaveBeenCalled();
  });
});
