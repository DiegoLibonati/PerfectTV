import type { JSX } from "react";
import type { MainLayoutStartProps } from "@/types/props";

import { useTheme } from "@/hooks/useTheme";

const MainLayoutStart = ({ children, className }: MainLayoutStartProps): JSX.Element => {
  const { bg } = useTheme();

  return (
    <main className={`flex items-start justify-start w-full h-screen ${bg} ${className}`}>
      {children}
    </main>
  );
};

export default MainLayoutStart;
