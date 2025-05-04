import { SelectProps } from "@src/entities/props";

export const Select = ({
  id,
  value,
  name,
  children,
  className,
  onChange,
}: SelectProps) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full h-12 p-2 ${className}`}
    >
      {children}
    </select>
  );
};
