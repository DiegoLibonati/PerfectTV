import { requireEnv } from "@/helpers/require_env.helper";

describe("require_env.helper", () => {
  const originalEnv = process.env;

  beforeEach((): void => {
    process.env = { ...originalEnv };
  });

  afterAll((): void => {
    process.env = originalEnv;
  });

  it("should return the value when the environment variable is set", () => {
    process.env.TEST_REQUIRE_ENV_VAR = "hello";

    const result: string = requireEnv("TEST_REQUIRE_ENV_VAR");

    expect(result).toBe("hello");
  });

  it("should throw when the environment variable is not set", () => {
    delete process.env.MISSING_VAR;

    expect(() => requireEnv("MISSING_VAR")).toThrow(
      "Missing required environment variable: MISSING_VAR",
    );
  });

  it("should throw when the environment variable is an empty string", () => {
    process.env.EMPTY_VAR = "";

    expect(() => requireEnv("EMPTY_VAR")).toThrow(
      "Missing required environment variable: EMPTY_VAR",
    );
  });

  it("should return the exact string value without transformation", () => {
    process.env.TEST_REQUIRE_ENV_VAR = "  http://some-api.com  ";

    const result: string = requireEnv("TEST_REQUIRE_ENV_VAR");

    expect(result).toBe("  http://some-api.com  ");
  });
});
