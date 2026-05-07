import type { Envs } from "@/types/envs";

export const mockEnvs: Envs = {
  GRAPHQL_URL: "http://localhost:4000/graphql",
  CHANNELS_NEEDS_TO_RUN: [],
  CODE_USE_IFRAME: ["ftv"],
};

export const mockEnvsNoIframe: Envs = {
  GRAPHQL_URL: "http://localhost:4000/graphql",
  CHANNELS_NEEDS_TO_RUN: [],
  CODE_USE_IFRAME: [],
};
