import { CategoryFlat, SourceFlat, TypeFlat } from "@src/entities/app";
import { DefaultBase } from "@src/entities/defaults";

import {
  CODE_CATEGORY_NEWS,
  CODE_SOURCE_FTV,
  CODE_SOURCE_TWITCH,
  CODE_SOURCE_YOUTUBE,
  CODE_TYPE_PRIVATE,
  CODE_TYPE_PUBLIC,
} from "@src/constants/vars.constant";

export const defaultBases: DefaultBase[] = [
  {
    codeSource: CODE_SOURCE_YOUTUBE,
    baseUrl: "https://www.youtube.com/embed/live_stream",
  },
];

export const defaultCategories: CategoryFlat[] = [
  {
    code: CODE_CATEGORY_NEWS,
    description: "Canales de Televisión de Noticias",
  },
];

export const defaultSources: SourceFlat[] = [
  {
    code: CODE_SOURCE_YOUTUBE,
    description: "Canales de Televisión de YouTube",
  },
  { code: CODE_SOURCE_TWITCH, description: "Canales de Televisión de Twitch" },
  { code: CODE_SOURCE_FTV, description: "Canales de Televisión de FTV" },
];

export const defaultTypes: TypeFlat[] = [
  {
    code: CODE_TYPE_PUBLIC,
    description: "Canales de Televisión Públicos",
  },
  { code: CODE_TYPE_PRIVATE, description: "Canales de Televisión Privados" },
];
