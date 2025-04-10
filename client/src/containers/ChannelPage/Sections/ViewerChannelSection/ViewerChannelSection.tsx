import { ChannelViewer } from "@/src/components/ChannelViewer/ChannelViewer";

import { useChannelContext } from "@/src/contexts/Channel/ChannelProvider";

import { useTheme } from "@/src/hooks/useTheme";

export const ViewerChannelSection = () => {
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
