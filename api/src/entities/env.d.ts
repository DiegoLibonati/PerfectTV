export type Envs = {
  PORT: Port;
  ENV: Env;
  BASE_URL: BaseUrl;
  PUPPETEER_EXECUTABLE_PATH: PuppeteerExecutablePath;
  FTV_URL: FtvUrl;
};

type Port = number;
type Env = "development" | "production" | "testing";
type BaseUrl = string;
type PuppeteerExecutablePath = string;
type FtvUrl = string;
