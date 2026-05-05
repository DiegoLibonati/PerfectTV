import type {
  CategoryCreatePayload,
  SourceCreatePayload,
  TypeCreatePayload,
} from "@/types/payloads";
import type { DefaultBase } from "@/types/defaults";

import {
  CODE_CATEGORY_NEWS,
  CODE_SOURCE_FTV,
  CODE_SOURCE_TWITCH,
  CODE_SOURCE_YOUTUBE,
  CODE_TYPE_PRIVATE,
  CODE_TYPE_PUBLIC,
} from "@/constants/vars.constant";

export const defaultBases: DefaultBase[] = [
  {
    codeSource: CODE_SOURCE_YOUTUBE,
    baseUrl: "https://www.youtube.com/embed/live_stream",
  },
];

export const defaultCategories: CategoryCreatePayload[] = [
  {
    code: CODE_CATEGORY_NEWS,
    description: "Canales de Televisión de Noticias",
  },
];

export const defaultSources: SourceCreatePayload[] = [
  {
    code: CODE_SOURCE_YOUTUBE,
    description: "Canales de Televisión de YouTube",
  },
  { code: CODE_SOURCE_TWITCH, description: "Canales de Televisión de Twitch" },
  { code: CODE_SOURCE_FTV, description: "Canales de Televisión de FTV" },
];

export const defaultTypes: TypeCreatePayload[] = [
  {
    code: CODE_TYPE_PUBLIC,
    description: "Canales de Televisión Públicos",
  },
  { code: CODE_TYPE_PRIVATE, description: "Canales de Televisión Privados" },
];
