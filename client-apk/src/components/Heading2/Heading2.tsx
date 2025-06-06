import { Heading2Props } from "@src/entities/props";

export const Heading2 = ({ className, children }: Heading2Props) => {
  return (
    <h2 className={`text-xl font-semibold lg:text-2xl ${className}`}>
      {children}
    </h2>
  );
};
