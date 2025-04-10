import { MainLayoutCenterProps } from "@/src/entities/props";

import { useTheme } from "@/src/hooks/useTheme";

export const MainLayoutCenter = ({
  children,
  className,
}: MainLayoutCenterProps) => {
  const { bg } = useTheme();

  return (
    <main
      className={`flex items-center justify-center w-full h-screen ${bg} ${className}`}
    >
      {children}
    </main>
  );
};
