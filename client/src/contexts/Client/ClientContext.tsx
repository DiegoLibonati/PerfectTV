import { createContext } from "react";

import { ClientContext as ClientContextT } from "@/src/entities/contexts";

export const ClientContext = createContext<ClientContextT | null>(null);
