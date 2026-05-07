import { useContext } from "react";

import type { UseChannelContext } from "@/types/hooks";

import { ChannelContext } from "@/contexts/ChannelContext/ChannelContext";

export const useChannelContext = (): UseChannelContext => {
  const context = useContext(ChannelContext);
  if (!context) {
    throw new Error("useChannelContext must be used within ChannelProvider");
  }
  return context;
};
