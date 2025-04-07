import { SelectOptionProps } from "@/src/entities/props";

export const SelectOption = ({ value, children }: SelectOptionProps) => {
  return <option value={value}>{children}</option>;
};
