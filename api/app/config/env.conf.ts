import dotenv from "dotenv";

import { EnvConf } from "@app/entities/config";

dotenv.config();

export const config: EnvConf = {
  PORT: Number(process.env.PORT!),
  HOT_RELOAD: process.env.CHOKIDAR_USEPOLLING!,
  PUPPETEER_EXECUTABLE_PATH: process.env.PUPPETEER_EXECUTABLE_PATH!,
  FTV_URL: process.env.FTV_URL!,
};
