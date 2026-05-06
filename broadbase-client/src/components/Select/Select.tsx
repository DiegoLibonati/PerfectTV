import type { JSX } from "react";
import type { SelectProps } from "@/types/props";

const Select = ({ id, value, name, children, className, onChange }: SelectProps): JSX.Element => {
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

export default Select;
