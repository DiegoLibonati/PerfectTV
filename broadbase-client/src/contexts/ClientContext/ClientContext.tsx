import { createContext } from "react";

import type { ClientContext as ClientContextT } from "@/types/contexts";

export const ClientContext = createContext<ClientContextT | null>(null);
