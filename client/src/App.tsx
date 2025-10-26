import { HashRouter } from "react-router-dom";

import { Language, Theme } from "@src/entities/app";

import { ClientProvider } from "@src/contexts/ClientContext/ClientContext";

import { AppRouter } from "@src/router/AppRouter";

import { useLocalStorage } from "@src/hooks/useLocalStorage";

import { LS_KEY_NAME_LANG, LS_KEY_NAME_THEME } from "@src/constants/vars";

function App() {
  const { get } = useLocalStorage();

  return (
    <ClientProvider
      defaultLanguage={(get(LS_KEY_NAME_LANG) as Language) || "es"}
      defualtTheme={(get(LS_KEY_NAME_THEME) as Theme) || "dark"}
    >
      <HashRouter>
        <AppRouter></AppRouter>
      </HashRouter>
    </ClientProvider>
  );
}

export default App;
