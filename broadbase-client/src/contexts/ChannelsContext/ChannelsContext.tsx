import { createContext } from "react";

import type { ChannelsContext as ChannelsContextT } from "@/types/contexts";

export const ChannelsContext = createContext<ChannelsContextT | null>(null);
