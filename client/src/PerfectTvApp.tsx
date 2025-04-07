import { Router } from "@/src/router/Router";

import { Language, Theme } from "@/src/entities/client";

import { ClientProvider } from "@/src/contexts/Client/ClientProvider";

import { useLocalStorage } from "@/src/hooks/useLocalStorage";

import { LS_KEY_NAME_LANG, LS_KEY_NAME_THEME } from "@/src/constants/general";

function PerfectTvApp() {
  const { get } = useLocalStorage();

  return (
    <ClientProvider
      defaultLanguage={(get(LS_KEY_NAME_LANG) as Language) || "es"}
      defualtTheme={(get(LS_KEY_NAME_THEME) as Theme) || "dark"}
    >
      <Router />
    </ClientProvider>
  );
}

export default PerfectTvApp;
