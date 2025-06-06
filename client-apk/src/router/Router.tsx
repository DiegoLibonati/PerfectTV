import { useMemo } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router";

import { ChannelPage } from "@src/pages/ChannelPage/ChannelPage";
import { ChannelsPage } from "@src/pages/ChannelsPage/ChannelsPage";

import { ChannelPageProvider } from "@src/contexts/ChannelPage/ChannelPageProvider";
import { ChannelsPageProvider } from "@src/contexts/ChannelsPage/ChannelsPageProvider";

import { useLocalStorage } from "@src/hooks/useLocalStorage";

import {
  DEFAULT_CHANNEL_NUMBER,
  LS_KEY_NAME_LAST_NUMBER_CHANNEL,
} from "@src/constants/general";

export const Router = () => {
  const { get } = useLocalStorage();

  const number = useMemo(() => {
    return (
      Number(get(LS_KEY_NAME_LAST_NUMBER_CHANNEL)) || DEFAULT_CHANNEL_NUMBER
    );
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/channel/:number"
          element={
            <ChannelPageProvider>
              <ChannelPage></ChannelPage>
            </ChannelPageProvider>
          }
        ></Route>

        <Route
          path="/channels"
          element={
            <ChannelsPageProvider>
              <ChannelsPage></ChannelsPage>
            </ChannelsPageProvider>
          }
        ></Route>

        <Route
          path="/*"
          element={<Navigate to={`/channel/${number}`}></Navigate>}
        ></Route>
      </Routes>
    </HashRouter>
  );
};
