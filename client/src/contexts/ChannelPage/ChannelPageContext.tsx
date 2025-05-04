import { createContext } from "react";

import { ChannelPageContext as ChannelPageContextT } from "@/src/entities/contexts";

export const ChannelPageContext = createContext<ChannelPageContextT | null>(null);
