import { whichPlayerToUseBySourceCode } from "@/helpers/whichPlayerToUseBySourceCode";

jest.mock("@/constants/envs", () => ({
  __esModule: true,
  default: {
    GRAPHQL_URL: "http://localhost:4000/graphql",
    CHANNELS_NEEDS_TO_RUN: [],
    CODE_USE_IFRAME: ["ftv", "custom-iframe"],
  },
}));

describe("whichPlayerToUseBySourceCode", () => {
  describe("when the source code is in the iframe list", () => {
    it("should return iframe for ftv", () => {
      expect(whichPlayerToUseBySourceCode("ftv")).toBe("iframe");
    });

    it("should return iframe for custom-iframe", () => {
      expect(whichPlayerToUseBySourceCode("custom-iframe")).toBe("iframe");
    });

    it("should be case-insensitive and return iframe for FTV", () => {
      expect(whichPlayerToUseBySourceCode("FTV")).toBe("iframe");
    });

    it("should be case-insensitive and return iframe for CUSTOM-IFRAME", () => {
      expect(whichPlayerToUseBySourceCode("CUSTOM-IFRAME")).toBe("iframe");
    });
  });

  describe("when the source code is not in the iframe list", () => {
    it("should return react-player for youtube", () => {
      expect(whichPlayerToUseBySourceCode("youtube")).toBe("react-player");
    });

    it("should return react-player for unknown sources", () => {
      expect(whichPlayerToUseBySourceCode("unknown-source")).toBe("react-player");
    });

    it("should return react-player for an empty string", () => {
      expect(whichPlayerToUseBySourceCode("")).toBe("react-player");
    });
  });
});
