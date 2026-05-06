import { useState } from "react";

import type { JSX } from "react";
import type { Language, Theme } from "@/types/app";
import type { ClientProviderProps } from "@/types/props";
import type { ClientState } from "@/types/states";

import { ClientContext } from "@/contexts/ClientContext/ClientContext";

export const ClientProvider = ({
  children,
  defaultLanguage,
  defaultTheme,
}: ClientProviderProps): JSX.Element => {
  const [clientState, setClientState] = useState<ClientState>({
    language: defaultLanguage ?? "es",
    theme: defaultTheme ?? "dark",
    sideBar: {
      open: false,
    },
  });

  const handleSetLanguage = (language: Language): void => {
    setClientState((state) => ({ ...state, language: language }));
  };

  const handleSetTheme = (theme: Theme): void => {
    setClientState((state) => ({ ...state, theme: theme }));
  };

  const handleSetSideBar = (open: boolean): void => {
    setClientState((state) => ({ ...state, sideBar: { ...state.sideBar, open: open } }));
  };

  return (
    <ClientContext.Provider
      value={{
        language: clientState.language,
        theme: clientState.theme,
        sideBar: clientState.sideBar.open,
        handleSetLanguage: handleSetLanguage,
        handleSetTheme: handleSetTheme,
        handleSetSideBar: handleSetSideBar,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
