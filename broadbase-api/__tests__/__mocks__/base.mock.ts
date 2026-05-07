import type { BaseWithRelations } from "@/types/app";

import { mockSource } from "@tests/__mocks__/source.mock";

export const mockBaseWithRelations: BaseWithRelations = {
  id: 1,
  baseUrl: "https://www.youtube.com/embed/live_stream",
  idSource: 1,
  source: mockSource,
};

export const mockBaseWithRelationsFtv: BaseWithRelations = {
  id: 1,
  baseUrl: "https://example.com/embed",
  idSource: 5,
  source: { id: 5, code: "ftv", description: "FTV" },
};
