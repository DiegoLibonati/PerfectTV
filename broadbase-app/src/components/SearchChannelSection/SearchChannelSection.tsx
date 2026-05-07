import type { JSX } from "react";

import CardSearchChannel from "@/components/CardSearchChannel/CardSearchChannel";

import { useChannelContext } from "@/hooks/useChannelContext";

const SearchChannelSection = (): JSX.Element => {
  const { searchNumber } = useChannelContext();

  return (
    <section className="hidden absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[24rem] h-32 lg:block">
      <CardSearchChannel search={searchNumber}></CardSearchChannel>
    </section>
  );
};

export default SearchChannelSection;
