import { useContext } from "react";

import { UseChannelContext } from "@src/entities/hooks";

import { ChannelContext } from "@src/contexts/ChannelContext/ChannelContext";

export const useChannelContext = (): UseChannelContext => {
  const context = useContext(ChannelContext);
  if (!context) {
    throw new Error("useChannelContext must be used within ChannelProvider");
  }
  return context;
};
