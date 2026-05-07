import type { Channel } from "@/types/app";

import { mockType } from "@tests/__mocks__/type.mock";
import { mockCategory } from "@tests/__mocks__/category.mock";
import { mockSource } from "@tests/__mocks__/source.mock";

export const mockChannel: Channel = {
  id: 1,
  name: "Test Channel",
  description: "Test description for channel one",
  thumbUrl: "https://example.com/thumb.jpg",
  url: "https://example.com/stream",
  number: 1,
  type: mockType,
  category: mockCategory,
  source: mockSource,
};

export const mockChannel2: Channel = {
  id: 2,
  name: "Second Channel",
  description: "Second description",
  thumbUrl: "https://example.com/thumb2.jpg",
  url: "https://example.com/stream2",
  number: 3,
  type: mockType,
  category: mockCategory,
  source: mockSource,
};

export const mockChannel3: Channel = {
  id: 3,
  name: "Third Channel",
  description: "Third description",
  thumbUrl: "https://example.com/thumb3.jpg",
  url: "https://example.com/stream3",
  number: 2,
  type: mockType,
  category: mockCategory,
  source: mockSource,
};

export const mockChannels: Channel[] = [mockChannel, mockChannel2, mockChannel3];
