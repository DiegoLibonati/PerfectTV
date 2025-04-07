import { Heading3Props } from "@/src/entities/props";

import { useTheme } from "@/src/hooks/useTheme";

export const Heading3 = ({ className, children }: Heading3Props) => {
  const { color } = useTheme();

  return (
    <h2 className={`text-lg font-medium ${color} lg:text-xl ${className}`}>
      {children}
    </h2>
  );
};
