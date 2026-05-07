import type { SourceWithRelations } from "@/types/app";
import type { Source } from "@prisma/client";

export const mockSource: Source = { id: 1, code: "youtube", description: "YouTube" };

export const mockSourceWithRelations: SourceWithRelations = {
  id: 1,
  code: "youtube",
  description: "YouTube",
  base: null,
};

export const mockYoutubeSource: SourceWithRelations = {
  id: 10,
  code: "youtube",
  description: "YouTube",
  base: null,
};

export const mockTwitchSource: SourceWithRelations = {
  id: 20,
  code: "twitch",
  description: "Twitch",
  base: null,
};
