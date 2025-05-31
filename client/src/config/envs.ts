import { Envs } from "@src/entities/configs";

export const envs: Envs = {
  GRAPHQL_URL: import.meta.env.VITE_GRAPHQL_URL,
  CHANNELS_NEEDS_TO_RUN: import.meta.env.VITE_CHANNELS_NEEDS_TO_RUN ? import.meta.env.VITE_CHANNELS_NEEDS_TO_RUN.split(",") : [],
  CODE_USE_IFRAME: import.meta.env.VITE_CODE_USE_IFRAME ? import.meta.env.VITE_CODE_USE_IFRAME.split(",") : ["ftv", "youtube"]
};
