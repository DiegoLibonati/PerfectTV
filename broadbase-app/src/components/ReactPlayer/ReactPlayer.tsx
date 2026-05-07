import RP from "react-player";

import type { JSX } from "react";
import type { ReactPlayerProps } from "@/types/props";

const ReactPlayer = ({ url, sizes, playing, controls }: ReactPlayerProps): JSX.Element => {
  const { height, width } = sizes;

  return <RP url={url} height={height} width={width} playing={playing} controls={controls}></RP>;
};

export default ReactPlayer;
