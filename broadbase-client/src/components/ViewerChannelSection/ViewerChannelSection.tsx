import type { JSX } from "react";

import ChannelViewer from "@/components/ChannelViewer/ChannelViewer";

import { useChannelContext } from "@/hooks/useChannelContext";
import { useTheme } from "@/hooks/useTheme";

const ViewerChannelSection = (): JSX.Element => {
  const { activeChannel } = useChannelContext();
  const { bg } = useTheme();

  return (
    <section
      className={`flex items-center justify-center h-full w-full select-none pointer-events-none ${bg}`}
    >
      <ChannelViewer
        name={activeChannel!.name}
        url={activeChannel!.url}
        sourceCode={activeChannel!.source.code}
        sizes={{
          height: window.innerHeight,
          width: window.innerWidth,
        }}
        controls={false}
        playing={true}
      ></ChannelViewer>
    </section>
  );
};

export default ViewerChannelSection;
