import { UseTheme } from "@/src/entities/hooks";

import { useClientContext } from "@/src/contexts/Client/ClientProvider";

export const useTheme = (): UseTheme => {
  const { theme } = useClientContext();

  return {
    bg: theme === "dark" ? "bg-black" : "bg-white",
    bgPrimary: "bg-primary",
    bgOut: theme === "dark" ? "bg-white" : "bg-black",
    color: theme === "dark" ? "text-white" : "text-black",
    colorPrimary: "text-primary",
    colorOut: theme === "dark" ? "text-black" : "text-white",
    border: theme === "dark" ? "border-white" : "border-black",
    borderPrimary: "border-primary",
    borderOut: theme === "dark" ? "border-black" : "border-white",
    borderTop: theme === "dark" ? "border-t-white" : "border-t-black",
    borderTopPrimary: "border-t-primary",
    borderTopOut: theme === "dark" ? "border-t-black" : "border-t-white",
    outline: theme === "dark" ? "outline-black" : "outline-white",
    outlinePrimary: "outline-primary",
    outlineOut: theme === "dark" ? "outline-white" : "outline-black",
  };
};
