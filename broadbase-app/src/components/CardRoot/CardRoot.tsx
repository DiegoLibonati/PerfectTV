import type { JSX } from "react";
import type { CardRootProps } from "@/types/props";

const CardRoot = ({ className, children }: CardRootProps): JSX.Element => {
  return (
    <div className={`w-full h-full p-2 shadow-md rounded-lg bg-opacity-75 card-root ${className}`}>
      {children}
    </div>
  );
};

export default CardRoot;
