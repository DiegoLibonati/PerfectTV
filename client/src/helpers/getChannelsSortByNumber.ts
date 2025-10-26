import { Channel } from "@src/entities/app";

export const getChannelsSortByNumber = (channels: Channel[]) => {
  return [...channels].sort((a, b) => a.number - b.number);
};
