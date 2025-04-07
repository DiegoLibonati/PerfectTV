import { UseTheme } from "@/src/entities/hooks";

import { useClientContext } from "@/src/contexts/Client/ClientProvider";

export const useTheme = (): UseTheme => {
  const { theme } = useClientContext();

  return {
    bg: theme === "dark" ? "bg-black" : "bg-white",
    bgOut: theme === "dark" ? "bg-white" : "bg-black",
    color: theme === "dark" ? "text-white" : "text-black",
    colorOut: theme === "dark" ? "text-black" : "text-white",
    border: theme === "dark" ? "border-white" : "border-black",
    borderOut: theme === "dark" ? "border-black" : "border-white",
    borderTop: theme === "dark" ? "border-t-white" : "border-t-black",
    borderTopOut: theme === "dark" ? "border-t-black" : "border-t-white",
  };
};
