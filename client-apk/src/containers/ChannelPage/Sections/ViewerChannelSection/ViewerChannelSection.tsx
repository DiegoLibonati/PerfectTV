import { ChannelViewer } from "@src/components/ChannelViewer/ChannelViewer";

import { useChannelPageContext } from "@src/contexts/ChannelPage/ChannelPageProvider";

import { useTheme } from "@src/hooks/useTheme";

export const ViewerChannelSection = () => {
  const { graphQL } = useChannelPageContext();
  const { bg } = useTheme();

  const { data } = graphQL;
  const { activeChannel } = data;

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
