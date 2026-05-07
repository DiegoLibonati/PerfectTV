import { useMemo } from "react";

import type { JSX } from "react";
import type { ChannelViewerProps } from "@/types/props";

import Iframe from "@/components/Iframe/Iframe";
import ReactPlayer from "@/components/ReactPlayer/ReactPlayer";

import { whichPlayerToUseBySourceCode } from "@/helpers/whichPlayerToUseBySourceCode";

const ChannelViewer = ({
  name,
  url,
  sourceCode,
  sizes,
  controls,
  playing,
}: ChannelViewerProps): JSX.Element => {
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

  return <ReactPlayer url={url} sizes={sizes} controls={controls} playing={playing}></ReactPlayer>;
};

export default ChannelViewer;
