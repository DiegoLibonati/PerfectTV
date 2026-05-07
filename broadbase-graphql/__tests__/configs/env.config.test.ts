import type { Envs } from "@/types/env";

describe("env.config", () => {
  const originalEnv: NodeJS.ProcessEnv = process.env;

  beforeEach((): void => {
    process.env = { ...originalEnv };
  });

  afterAll((): void => {
    process.env = originalEnv;
  });

  const loadEnvs = (): Envs => {
    let result!: Envs;
    jest.isolateModules(() => {
      result = jest.requireActual<{ envs: Envs }>("@/configs/env.config").envs;
    });
    return result;
  };

  const expectLoadToThrow = (message: string): void => {
    expect(() => {
      jest.isolateModules(() => {
        jest.requireActual("@/configs/env.config");
      });
    }).toThrow(message);
  };

  describe("PORT", () => {
    it("should read PORT from env as a number", () => {
      process.env.PORT = "3000";
      process.env.API_URL = "http://test-api.com";

      const envs: Envs = loadEnvs();

      expect(envs.PORT).toBe(3000);
    });

    it("should fall back to 5051 when PORT is not set", () => {
      delete process.env.PORT;
      process.env.API_URL = "http://test-api.com";

      const envs: Envs = loadEnvs();

      expect(envs.PORT).toBe(5051);
    });

    it("should fall back to 5051 when PORT is not a valid number", () => {
      process.env.PORT = "abc";
      process.env.API_URL = "http://test-api.com";

      const envs: Envs = loadEnvs();

      expect(envs.PORT).toBe(5051);
    });
  });

  describe("ENV", () => {
    it("should read NODE_ENV from env as Env type", () => {
      process.env.NODE_ENV = "production";
      process.env.API_URL = "http://test-api.com";

      const envs: Envs = loadEnvs();

      expect(envs.ENV).toBe("production");
    });

    it("should fall back to development when NODE_ENV is not set", () => {
      delete process.env.NODE_ENV;
      process.env.API_URL = "http://test-api.com";

      const envs: Envs = loadEnvs();

      expect(envs.ENV).toBe("development");
    });
  });

  describe("BASE_URL", () => {
    it("should read BASE_URL from env", () => {
      process.env.BASE_URL = "http://my-base.com";
      process.env.API_URL = "http://test-api.com";

      const envs: Envs = loadEnvs();

      expect(envs.BASE_URL).toBe("http://my-base.com");
    });

    it("should fall back to empty string when BASE_URL is not set", () => {
      delete process.env.BASE_URL;
      process.env.API_URL = "http://test-api.com";

      const envs: Envs = loadEnvs();

      expect(envs.BASE_URL).toBe("");
    });
  });

  describe("API_URL", () => {
    it("should read API_URL from env", () => {
      process.env.API_URL = "http://my-api.com";

      const envs: Envs = loadEnvs();

      expect(envs.API_URL).toBe("http://my-api.com");
    });

    it("should throw when API_URL is not set", () => {
      delete process.env.API_URL;

      expectLoadToThrow("Missing required environment variable: API_URL");
    });

    it("should throw when API_URL is an empty string", () => {
      process.env.API_URL = "";

      expectLoadToThrow("Missing required environment variable: API_URL");
    });
  });
});
