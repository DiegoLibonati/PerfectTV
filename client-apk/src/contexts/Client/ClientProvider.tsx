import { useContext, useState } from "react";

import { ClientContext as ClientContextT } from "@src/entities/contexts";
import { ClientProviderProps } from "@src/entities/props";
import { Language, SideBar, Theme } from "@src/entities/client";

import { ClientContext } from "@src/contexts/Client/ClientContext";

export const ClientProvider = ({
  children,
  defaultLanguage,
  defualtTheme,
}: ClientProviderProps) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage || "es");
  const [theme, setTheme] = useState<Theme>(defualtTheme || "dark");
  const [sideBar, setSideBar] = useState<SideBar>({
    open: false,
  });

  const handleSetLanguage = (language: Language): void => {
    setLanguage(language);
  };

  const handleSetTheme = (theme: Theme): void => {
    setTheme(theme);
  };

  const handleSetSideBar = (sb: Partial<SideBar>) => {
    setSideBar((state) => ({ ...state, ...sb }));
  };

  return (
    <ClientContext.Provider
      value={{
        language: language,
        theme: theme,
        sideBar: sideBar,
        handleSetLanguage: handleSetLanguage,
        handleSetTheme: handleSetTheme,
        handleSetSideBar: handleSetSideBar,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = (): ClientContextT => {
  return useContext(ClientContext)!;
};
