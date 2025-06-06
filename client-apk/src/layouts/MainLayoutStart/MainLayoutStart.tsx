import { MainLayoutStartProps } from "@src/entities/props";

import { useTheme } from "@src/hooks/useTheme";

export const MainLayoutStart = ({
  children,
  className,
}: MainLayoutStartProps) => {
  const { bg } = useTheme();

  return (
    <main
      className={`flex items-start justify-start w-full h-screen ${bg} ${className}`}
    >
      {children}
    </main>
  );
};
