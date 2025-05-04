import { createContext } from "react";

import { ChannelsPageContext as ChannelsPageContextT } from "@/src/entities/contexts";

export const ChannelsPageContext = createContext<ChannelsPageContextT | null>(null);
