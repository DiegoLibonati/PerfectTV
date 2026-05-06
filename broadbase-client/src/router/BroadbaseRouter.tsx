import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import type { JSX } from "react";

import ChannelPage from "@/pages/ChannelPage/ChannelPage";
import ChannelsPage from "@/pages/ChannelsPage/ChannelsPage";

import { ChannelProvider } from "@/contexts/ChannelContext/ChannelProvider";
import { ChannelsProvider } from "@/contexts/ChannelsContext/ChannelsProvider";

import { PublicRoute } from "@/router/PublicRoute";

import { useLocalStorage } from "@/hooks/useLocalStorage";

import { DEFAULT_CHANNEL_NUMBER, LS_KEY_NAME_LAST_NUMBER_CHANNEL } from "@/constants/vars";

export const BroadbaseRouter = (): JSX.Element => {
  const { get } = useLocalStorage();

  const number = useMemo(() => {
    return Number(get(LS_KEY_NAME_LAST_NUMBER_CHANNEL)) || DEFAULT_CHANNEL_NUMBER;
  }, []);

  return (
    <Routes>
      <Route element={<PublicRoute />}>
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

      <Route path="/*" element={<Navigate to={`/channel/${number}`}></Navigate>}></Route>
    </Routes>
  );
};
