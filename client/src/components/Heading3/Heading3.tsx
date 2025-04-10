import { Heading3Props } from "@/src/entities/props";

export const Heading3 = ({ className, children }: Heading3Props) => {
  return (
    <h2 className={`text-lg font-medium lg:text-xl ${className}`}>
      {children}
    </h2>
  );
};
