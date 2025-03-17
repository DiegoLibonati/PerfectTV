import { Channel } from "@app/entities/models";

export const sourceCodeChecker = (
  channels: Channel[],
  code: string
): boolean => {
  return channels.some((channel) => channel.source.code === code);
};
