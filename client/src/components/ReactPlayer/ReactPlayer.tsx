import RP from "react-player";

import { ReactPlayerProps } from "@src/entities/props";

export const ReactPlayer = ({
  url,
  sizes,
  playing,
  controls,
}: ReactPlayerProps) => {
  const { height, width } = sizes;

  return (
    <RP
      url={url}
      height={height}
      width={width}
      playing={playing}
      controls={controls}
    ></RP>
  );
};
