import { useContext } from "react";

import { UseChannelsContext } from "@src/entities/hooks";

import { ChannelsContext } from "@src/contexts/ChannelsContext/ChannelsContext";

export const useChannelsContext = (): UseChannelsContext => {
  const context = useContext(ChannelsContext);
  if (!context) {
    throw new Error("useChannelsContext must be used within ChannelsProvider");
  }
  return context;
};
