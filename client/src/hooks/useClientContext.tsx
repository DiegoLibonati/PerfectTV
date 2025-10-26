import { useContext } from "react";

import { UseClientContext } from "@src/entities/hooks";

import { ClientContext } from "@src/contexts/ClientContext/ClientContext";

export const useClientContext = (): UseClientContext => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClientContext must be used within ClientProvider");
  }
  return context;
};
