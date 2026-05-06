import { useContext } from "react";

import type { UseChannelsContext } from "@/types/hooks";

import { ChannelsContext } from "@/contexts/ChannelsContext/ChannelsContext";

export const useChannelsContext = (): UseChannelsContext => {
  const context = useContext(ChannelsContext);
  if (!context) {
    throw new Error("useChannelsContext must be used within ChannelsProvider");
  }
  return context;
};
