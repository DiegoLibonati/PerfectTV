import { EnvConf } from "@app/entities/config";

export const config: EnvConf = {
  PORT: Number(process.env.PORT!),
  HOT_RELOAD: process.env.CHOKIDAR_USEPOLLING!,
  API_URL: `${process.env.API_URL!}/api/v1`,
};
