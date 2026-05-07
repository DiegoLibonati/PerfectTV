import type {
  CategoryCreatePayload,
  SourceCreatePayload,
  TypeCreatePayload,
} from "@/types/payloads";
import type { DefaultBase, DefaultChannel } from "@/types/defaults";

import {
  CODE_CATEGORY_NEWS,
  CODE_CATEGORY_GAMEPLAYS,
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
  { code: CODE_CATEGORY_NEWS, description: "Canales de Televisión de Noticias" },
  { code: CODE_CATEGORY_GAMEPLAYS, description: "Canales de Gameplays" },
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

export const defaultChannels: DefaultChannel[] = [
  {
    name: "thebausffs",
    description: "thebausffs Twitch Stream",
    thumbUrl: "https://static-cdn.jtvnw.net/previews-ttv/live_user_thebausffs-1280x720.jpg",
    url: "https://www.twitch.tv/thebausffs",
    urlRest: "/thebausffs",
    number: 1,
    codeType: CODE_TYPE_PUBLIC,
    codeCategory: CODE_CATEGORY_GAMEPLAYS,
    codeSource: CODE_SOURCE_TWITCH,
  },
  {
    name: "YouTube UCba3hpU7EFBSk817y9qZkiA",
    description: "YouTube Live Stream",
    thumbUrl: "https://i.ytimg.com/vi/UCba3hpU7EFBSk817y9qZkiA/maxresdefault.jpg",
    url: "https://www.youtube.com/embed/live_stream?channel=UCba3hpU7EFBSk817y9qZkiA&autoplay=1",
    urlRest: "?channel=UCba3hpU7EFBSk817y9qZkiA&autoplay=1",
    number: 2,
    codeType: CODE_TYPE_PUBLIC,
    codeCategory: CODE_CATEGORY_NEWS,
    codeSource: CODE_SOURCE_YOUTUBE,
  },
];
