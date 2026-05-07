import type { Category } from "@/types/app";

import { mockChannel, mockChannel2, mockChannel3 } from "@tests/__mocks__/channel.mock";

export const mockCategory: Category = {
  id: 1,
  code: "news",
  description: "News",
};

export const mockCategoryWithChannels: Category = {
  id: 1,
  code: "news",
  description: "News",
  channels: [mockChannel, mockChannel2, mockChannel3],
};
