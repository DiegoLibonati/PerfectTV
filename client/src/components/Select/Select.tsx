import { SelectProps } from "@/src/entities/props";

import { useTheme } from "@/src/hooks/useTheme";

export const Select = ({
  id,
  value,
  name,
  children,
  onChange,
}: SelectProps) => {
  const { bgOut, colorOut } = useTheme();

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full h-12 p-2 ${bgOut} ${colorOut}`}
    >
      {children}
    </select>
  );
};
