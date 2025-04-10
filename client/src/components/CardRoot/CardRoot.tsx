import { CardRootProps } from "@/src/entities/props";

export const CardRoot = ({ className, children }: CardRootProps) => {
  return (
    <div
      className={`w-full h-full p-2 shadow-md rounded-lg bg-opacity-75 card-root ${className}`}
    >
      {children}
    </div>
  );
};
