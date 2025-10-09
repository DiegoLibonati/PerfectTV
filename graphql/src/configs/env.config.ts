import { Env, Envs } from "@src/entities/env";

export const envs: Envs = {
  PORT: Number(process.env.PORT) || 5001,
  ENV: (process.env.NODE_ENV as Env) || "development",
  BASE_URL: process.env.BASE_URL as string,
  API_URL: `${process.env.API_URL!}/api/v1`,
};
