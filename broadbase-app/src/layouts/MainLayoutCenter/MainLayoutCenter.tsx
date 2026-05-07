import type { JSX } from "react";
import type { MainLayoutCenterProps } from "@/types/props";

import { useTheme } from "@/hooks/useTheme";

const MainLayoutCenter = ({ children, className }: MainLayoutCenterProps): JSX.Element => {
  const { bg } = useTheme();

  return (
    <main className={`flex items-center justify-center w-full h-screen ${bg} ${className}`}>
      {children}
    </main>
  );
};

export default MainLayoutCenter;
