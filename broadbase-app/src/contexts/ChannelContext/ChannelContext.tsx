import { createContext } from "react";

import type { ChannelContext as ChannelContextT } from "@/types/contexts";

export const ChannelContext = createContext<ChannelContextT | null>(null);
