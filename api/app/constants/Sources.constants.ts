import { Source } from "@app/entities/models";

export const sourcesConstants: Pick<Source, "code" | "description">[] = [
  {
    code: "youtube",
    description: "Canales de Televisión de YouTube",
  },
  { code: "twitch", description: "Canales de Televisión de Twitch" },
  { code: "ftv", description: "Canales de Televisión de FTV" },
];
