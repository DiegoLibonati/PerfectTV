import { requireEnv } from "@/helpers/require_env.helper";

describe("require_env.helper", () => {
  const originalEnv: NodeJS.ProcessEnv = process.env;

  beforeEach((): void => {
    process.env = { ...originalEnv };
  });

  afterAll((): void => {
    process.env = originalEnv;
  });

  it("should return the value when the variable is set", () => {
    process.env.REQUIRE_ENV_TEST_VAR = "hello";

    const result: string = requireEnv("REQUIRE_ENV_TEST_VAR");

    expect(result).toBe("hello");
  });

  it("should throw when the variable is not set", () => {
    delete process.env.REQUIRE_ENV_TEST_VAR;

    expect(() => requireEnv("REQUIRE_ENV_TEST_VAR")).toThrow(
      "Missing required environment variable: REQUIRE_ENV_TEST_VAR"
    );
  });

  it("should throw when the variable is an empty string", () => {
    process.env.REQUIRE_ENV_TEST_VAR = "";

    expect(() => requireEnv("REQUIRE_ENV_TEST_VAR")).toThrow();
  });
});
