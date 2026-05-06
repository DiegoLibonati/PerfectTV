import { useContext } from "react";

import type { UseClientContext } from "@/types/hooks";

import { ClientContext } from "@/contexts/ClientContext/ClientContext";

export const useClientContext = (): UseClientContext => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClientContext must be used within ClientProvider");
  }
  return context;
};
