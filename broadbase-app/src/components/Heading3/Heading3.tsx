import type { JSX } from "react";
import type { Heading3Props } from "@/types/props";

const Heading3 = ({ className, children }: Heading3Props): JSX.Element => {
  return <h2 className={`text-lg font-medium lg:text-xl ${className}`}>{children}</h2>;
};

export default Heading3;
