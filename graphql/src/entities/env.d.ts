export type Envs = {
  PORT: Port;
  ENV: Env;
  BASE_URL: BaseUrl;
  API_URL: ApiUrl;
};

type Port = number;
type Env = "development" | "production" | "testing";
type BaseUrl = string;
type ApiUrl = string;
