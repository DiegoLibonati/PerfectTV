import type { Channel } from "@/types/app";

export const getChannelsSortByNumber = (channels: Channel[]): Channel[] => {
  return [...channels].sort((a, b) => a.number - b.number);
};
