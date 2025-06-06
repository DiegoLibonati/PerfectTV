import { LoaderSimpleProps } from "@src/entities/props";

import "@src/components/LoaderSimple/LoaderSimple.css";

export const LoaderSimple = ({ className }: LoaderSimpleProps) => {
  return <span className={`loader ${className}`}></span>;
};
