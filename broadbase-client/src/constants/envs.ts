import type { Envs } from "@/types/envs";

const envs: Envs = {
  GRAPHQL_URL: import.meta.env.VITE_GRAPHQL_URL as string,
  CHANNELS_NEEDS_TO_RUN: (import.meta.env.VITE_CHANNELS_NEEDS_TO_RUN as string).split(","),
  CODE_USE_IFRAME: (import.meta.env.VITE_CODE_USE_IFRAME as string).split(","),
};

export default envs;
