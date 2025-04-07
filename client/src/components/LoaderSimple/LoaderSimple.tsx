import { useTheme } from "@/src/hooks/useTheme";

import "@/src/components/LoaderSimple/LoaderSimple.css";

export const LoaderSimple = () => {
  const { borderTop } = useTheme();

  return <span className={`loader ${borderTop}`}></span>;
};
