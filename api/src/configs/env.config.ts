import { Env, Envs } from "@src/entities/env";

export const envs: Envs = {
  PORT: Number(process.env.PORT) || 5000,
  ENV: (process.env.NODE_ENV as Env) || "development",
  BASE_URL: process.env.BASE_URL as string,
  PUPPETEER_EXECUTABLE_PATH: process.env.PUPPETEER_EXECUTABLE_PATH as string,
  FTV_URL: process.env.FTV_URL as string,
};
