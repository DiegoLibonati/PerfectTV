import type { JSX } from "react";
import type { LoaderSimpleProps } from "@/types/props";

import "@/components/LoaderSimple/LoaderSimple.css";

const LoaderSimple = ({ className }: LoaderSimpleProps): JSX.Element => {
  return <span className={`loader ${className}`}></span>;
};

export default LoaderSimple;
