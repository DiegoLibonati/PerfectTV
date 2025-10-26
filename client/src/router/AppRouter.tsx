import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { ChannelPage } from "@src/pages/ChannelPage/ChannelPage";
import { ChannelsPage } from "@src/pages/ChannelsPage/ChannelsPage";

import { ChannelProvider } from "@src/contexts/ChannelContext/ChannelContext";
import { ChannelsProvider } from "@src/contexts/ChannelsContext/ChannelsContext";

import { TvRoute } from "@src/router/TvRoute";

import { useLocalStorage } from "@src/hooks/useLocalStorage";

import {
  DEFAULT_CHANNEL_NUMBER,
  LS_KEY_NAME_LAST_NUMBER_CHANNEL,
} from "@src/constants/vars";

export const AppRouter = () => {
  const { get } = useLocalStorage();

  const number = useMemo(() => {
    return (
      Number(get(LS_KEY_NAME_LAST_NUMBER_CHANNEL)) || DEFAULT_CHANNEL_NUMBER
    );
  }, []);

  return (
    <Routes>
      <Route element={<TvRoute />}>
        <Route
          path="/channel/:number"
          element={
            <ChannelProvider>
              <ChannelPage></ChannelPage>
            </ChannelProvider>
          }
        ></Route>

        <Route
          path="/channels"
          element={
            <ChannelsProvider>
              <ChannelsPage></ChannelsPage>
            </ChannelsProvider>
          }
        ></Route>
      </Route>

      <Route
        path="/*"
        element={<Navigate to={`/channel/${number}`}></Navigate>}
      ></Route>
    </Routes>
  );
};
