import { singleInvalidUrlChecker } from "@/helpers/single_invalid_url_checker.helper";

describe("single_invalid_url_checker.helper", () => {
  it("should return true for a URL starting with https://", () => {
    expect(singleInvalidUrlChecker("https://example.com/stream")).toBe(true);
  });

  it("should return true for a URL starting with http://", () => {
    expect(singleInvalidUrlChecker("http://example.com/stream")).toBe(true);
  });

  it("should return false for a URL starting with ftp://", () => {
    expect(singleInvalidUrlChecker("ftp://example.com")).toBe(false);
  });

  it("should return false for an empty string", () => {
    expect(singleInvalidUrlChecker("")).toBe(false);
  });

  it("should return false for a relative path", () => {
    expect(singleInvalidUrlChecker("/channel/live")).toBe(false);
  });

  it("should return false for a domain without protocol", () => {
    expect(singleInvalidUrlChecker("example.com")).toBe(false);
  });
});
