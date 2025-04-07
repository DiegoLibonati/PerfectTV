import { Channel } from "@/src/entities/api";

export const getNumbersChannels = (
  numberChannels: Pick<Channel, "id" | "number">[]
): number[] => {
  return numberChannels
    .map((numberChannel) => {
      return numberChannel.number;
    })
    .sort((a, b) => a - b);
};
