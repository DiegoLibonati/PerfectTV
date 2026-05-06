import type { Channel } from "@/types/app";

export const getNumbersChannels = (numberChannels: Pick<Channel, "id" | "number">[]): number[] => {
  return numberChannels.map(({ number }) => number).sort((a, b) => a - b);
};
