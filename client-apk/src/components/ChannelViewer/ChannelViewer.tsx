import { useMemo } from "react";

import { ChannelViewerProps } from "@src/entities/props";

import { Iframe } from "@src/components/Iframe/Iframe";
import { ReactPlayer } from "@src/components/ReactPlayer/ReactPlayer";

import { whichPlayerToUseBySourceCode } from "@src/helpers/whichPlayerToUseBySourceCode";

export const ChannelViewer = ({
  name,
  url,
  sourceCode,
  sizes,
  controls,
  playing,
}: ChannelViewerProps) => {
  const renderNativeIframe = useMemo(() => {
    return whichPlayerToUseBySourceCode(sourceCode);
  }, [sourceCode]);

  if (renderNativeIframe === "iframe") {
    return (
      <Iframe
        url={url}
        sizes={sizes}
        allow={"autoplay; fullscreen; encrypted-media"}
        title={`iframe to view: ${name}`}
      ></Iframe>
    );
  }

  return (
    <ReactPlayer
      url={url}
      sizes={sizes}
      controls={controls}
      playing={playing}
    ></ReactPlayer>
  );
};
