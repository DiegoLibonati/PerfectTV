import dotenv from "dotenv";

import { EnvConf } from "@app/entities/config";

dotenv.config();

export const config: EnvConf = {
  PORT: Number(process.env.PORT!),
  HOT_RELOAD: process.env.CHOKIDAR_USEPOLLING!,
};
