import type { JSX } from "react";

import CardActiveChannel from "@/components/CardActiveChannel/CardActiveChannel";

import { useChannelContext } from "@/hooks/useChannelContext";

const ActiveChannelSection = (): JSX.Element => {
  const { activeChannel, channelChange } = useChannelContext();

  return (
    <section className="absolute top-2 left-2 w-[80%] h-12 md:h-24 lg:w-[46rem] lg:h-48 lg:top-4 lg:left-4">
      <CardActiveChannel
        active={channelChange}
        description={activeChannel!.description}
        name={activeChannel!.name}
        thumbUrl={activeChannel!.thumbUrl}
        number={activeChannel!.number}
      ></CardActiveChannel>
    </section>
  );
};

export default ActiveChannelSection;
