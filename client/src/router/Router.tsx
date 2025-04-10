import { useMemo } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router";

import { ChannelPage } from "@/src/pages/ChannelPage/ChannelPage";
import { ChannelsPage } from "@/src/pages/ChannelsPage/ChannelsPage";

import { ChannelProvider } from "@/src/contexts/Channel/ChannelProvider";

import { useLocalStorage } from "@/src/hooks/useLocalStorage";

import {
  DEFAULT_CHANNEL_NUMBER,
  LS_KEY_NAME_LAST_NUMBER_CHANNEL,
} from "@/src/constants/general";

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
            <ChannelProvider>
              <ChannelPage></ChannelPage>
            </ChannelProvider>
          }
        ></Route>

        <Route path="/channels" element={<ChannelsPage></ChannelsPage>}></Route>

        <Route
          path="/*"
          element={<Navigate to={`/channel/${number}`}></Navigate>}
        ></Route>
      </Routes>
    </HashRouter>
  );
};
