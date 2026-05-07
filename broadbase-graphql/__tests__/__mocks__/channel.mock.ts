import type { Channel } from "@/types/app";

export const mockChannel: Channel = {
  id: 5,
  name: "Canal 5",
  description: "Descripcion",
  thumbUrl: "http://thumb.com/img.png",
  url: "http://stream.com/live",
  number: 5,
  idType: 1,
  idCategory: 1,
  idSource: 1,
  type: { id: 1, code: "live", description: "Live TV" },
  category: { id: 1, code: "sports", description: "Sports" },
  source: { id: 1, code: "src1", description: "Source 1" },
};
