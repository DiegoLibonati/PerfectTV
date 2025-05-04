import { Channel } from "@src/entities/api";

export const getChannelsSortByNumber = (channels: Channel[]) => {
  return [...channels].sort((a, b) => a.number - b.number);
};
