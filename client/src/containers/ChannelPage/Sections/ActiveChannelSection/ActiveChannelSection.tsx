import { CardActiveChannel } from "@src/components/CardActiveChannel/CardActiveChannel";

import { useChannelPageContext } from "@src/contexts/ChannelPage/ChannelPageProvider";

export const ActiveChannelSection = () => {
  const { graphQL, channelChange } = useChannelPageContext();

  const { data } = graphQL;
  const { activeChannel } = data;

  return (
    <section className="absolute top-2 left-2 w-[80%] h-12 md:h-24 lg:w-[46rem] lg:h-48 lg:top-4 lg:left-4">
      <CardActiveChannel
        active={channelChange}
        description={activeChannel?.description as string}
        name={activeChannel?.name as string}
        thumbUrl={activeChannel?.thumbUrl as string}
        number={activeChannel?.number as number}
      ></CardActiveChannel>
    </section>
  );
};
