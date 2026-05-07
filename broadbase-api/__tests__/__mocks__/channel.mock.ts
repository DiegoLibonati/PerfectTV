import type { ChannelWithRelations } from "@/types/app";

import { mockType } from "@tests/__mocks__/type.mock";
import { mockCategory } from "@tests/__mocks__/category.mock";
import { mockSource } from "@tests/__mocks__/source.mock";

export const mockChannelWithRealations: ChannelWithRelations = {
  id: 1,
  name: "Test Channel",
  description: "A test channel",
  thumbUrl: "https://example.com/thumb.jpg",
  url: "https://www.youtube.com/embed/live_stream?channel=abc",
  urlRest: "?channel=abc",
  number: 1,
  idType: 1,
  idCategory: 1,
  idSource: 1,
  type: mockType,
  category: mockCategory,
  source: mockSource,
};
