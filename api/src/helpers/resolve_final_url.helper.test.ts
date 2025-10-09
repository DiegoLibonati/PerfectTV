import { resolveFinalUrl } from "@src/helpers/resolve_final_url.helper";

jest.mock("got", () => ({
  got: jest.fn(),
}));

describe("resolve_final_url.helper.ts", () => {
  const mockGot = require("got").got as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("It should return the final URL when redirections are followed successfully", async () => {
    mockGot.mockResolvedValueOnce({ url: "https://final.example.com" });

    const result = await resolveFinalUrl("https://redirect.example.com");

    expect(mockGot).toHaveBeenCalledWith("https://redirect.example.com", {
      followRedirect: true,
    });
    expect(result).toBe("https://final.example.com");
  });

  test("It should throw an error when got fails to fetch the URL", async () => {
    mockGot.mockRejectedValueOnce(new Error("Network error"));

    await expect(resolveFinalUrl("https://broken.url")).rejects.toThrow(
      "Network error"
    );

    expect(mockGot).toHaveBeenCalledWith("https://broken.url", {
      followRedirect: true,
    });
  });
});
