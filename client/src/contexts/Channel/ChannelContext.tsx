import { createContext } from "react";

import { ChannelContext as ChannelContextT } from "@/src/entities/contexts";

export const ChannelContext = createContext<ChannelContextT | null>(null);
