import { Channel } from "@app/entities/models";

export const invalidUrlChecker = (channels: Channel[]): boolean => {
  return channels.some((channel) => !channel.url.includes("https"));
};
