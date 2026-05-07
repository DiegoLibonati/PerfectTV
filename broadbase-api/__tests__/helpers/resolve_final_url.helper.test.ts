import { resolveFinalUrl } from "@/helpers/resolve_final_url.helper";

const mockFetch: jest.Mock = jest.fn();

global.fetch = mockFetch as typeof global.fetch;

describe("resolve_final_url.helper", () => {
  it("should return the final URL after redirect", async () => {
    mockFetch.mockResolvedValue({ url: "https://final.example.com/page" });

    const result: string = await resolveFinalUrl("https://start.example.com");

    expect(mockFetch).toHaveBeenCalledWith("https://start.example.com", { redirect: "follow" });
    expect(result).toBe("https://final.example.com/page");
  });

  it("should return the same URL when there is no redirect", async () => {
    mockFetch.mockResolvedValue({ url: "https://same.example.com" });

    const result: string = await resolveFinalUrl("https://same.example.com");

    expect(result).toBe("https://same.example.com");
  });

  it("should throw when fetch fails", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    await expect(resolveFinalUrl("https://broken.example.com")).rejects.toThrow("Network error");
  });
});
