import { CardSearchChannel } from "@src/components/CardSearchChannel/CardSearchChannel";

import { useChannelPageContext } from "@src/contexts/ChannelPage/ChannelPageProvider";

export const SearchChannelSection = () => {
  const { searchNumber } = useChannelPageContext();

  return (
    <section className="hidden absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[24rem] h-32 lg:block">
      <CardSearchChannel search={searchNumber}></CardSearchChannel>
    </section>
  );
};
