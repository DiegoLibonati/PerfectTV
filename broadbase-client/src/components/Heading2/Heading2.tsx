import type { JSX } from "react";
import type { Heading2Props } from "@/types/props";

const Heading2 = ({ className, children }: Heading2Props): JSX.Element => {
  return <h2 className={`text-xl font-semibold lg:text-2xl ${className}`}>{children}</h2>;
};

export default Heading2;
