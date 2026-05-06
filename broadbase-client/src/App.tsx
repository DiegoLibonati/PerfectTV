import { HashRouter } from "react-router-dom";

import type { JSX } from "react";
import type { Language, Theme } from "@/types/app";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

import { BroadbaseRouter } from "@/router/BroadbaseRouter";

import { useLocalStorage } from "@/hooks/useLocalStorage";

import { LS_KEY_NAME_LANG, LS_KEY_NAME_THEME } from "@/constants/vars";

function App(): JSX.Element {
  const { get } = useLocalStorage();

  return (
    <ClientProvider
      defaultLanguage={get(LS_KEY_NAME_LANG) as Language}
      defaultTheme={get(LS_KEY_NAME_THEME) as Theme}
    >
      <HashRouter>
        <BroadbaseRouter></BroadbaseRouter>
      </HashRouter>
    </ClientProvider>
  );
}

export default App;
