import { CardRootProps } from "@/src/entities/props";

import { useTheme } from "@/src/hooks/useTheme";

export const CardRoot = ({ className, children }: CardRootProps) => {
  const { bg } = useTheme();

  return (
    <div
      className={`w-full h-full p-2 shadow-md rounded-lg bg-opacity-75 ${bg} ${className}`}
    >
      {children}
    </div>
  );
};
