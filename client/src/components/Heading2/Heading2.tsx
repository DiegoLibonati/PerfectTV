import { Heading2Props } from "@/src/entities/props";

import { useTheme } from "@/src/hooks/useTheme";

export const Heading2 = ({ className, children }: Heading2Props) => {
  const { color } = useTheme();

  return (
    <h2 className={`text-xl font-semibold ${color} lg:text-2xl ${className}`}>
      {children}
    </h2>
  );
};
