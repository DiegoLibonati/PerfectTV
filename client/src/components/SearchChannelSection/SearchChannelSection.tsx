import { CardSearchChannel } from "@src/components/CardSearchChannel/CardSearchChannel";

import { useChannelContext } from "@src/hooks/useChannelContext";

export const SearchChannelSection = () => {
  const { searchNumber } = useChannelContext();

  return (
    <section className="hidden absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[24rem] h-32 lg:block">
      <CardSearchChannel search={searchNumber}></CardSearchChannel>
    </section>
  );
};
