import { Source } from "@app/entities/models";

export const CODE_YOUTUBE = "youtube";
export const CODE_TWITCH = "twitch";
export const CODE_FTV = "ftv";

const sourcesConstants: Pick<Source, "code" | "description">[] = [
  {
    code: CODE_YOUTUBE,
    description: "Canales de Televisión de YouTube",
  },
  { code: CODE_TWITCH, description: "Canales de Televisión de Twitch" },
  { code: CODE_FTV, description: "Canales de Televisión de FTV" },
];

export default sourcesConstants;
