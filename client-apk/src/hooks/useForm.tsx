import { ChangeEvent, useState } from "react";

import { UseFormProps } from "@src/entities/props";
import { UseForm } from "@src/entities/hooks";

export const useForm = <T extends object>({
  initialValueForm,
}: UseFormProps<T>): UseForm<T> => {
  const [formState, setFormState] = useState<T>(initialValueForm);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const inputName = target.name;
    const inputValue = target.value;

    return setFormState({ ...formState, [inputName]: inputValue });
  };

  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const target = e.target as HTMLSelectElement;
    const inputName = target.name;
    const inputValue = target.value;

    return setFormState({ ...formState, [inputName]: inputValue });
  };

  const onMultiSelectChange = (
    e: ChangeEvent<HTMLSelectElement>,
    key: keyof T
  ) => {
    const target = e.target as HTMLSelectElement;
    const multiSelectValue = target.value;
    const currentMultiSelectValue = formState[key] as string;

    if (multiSelectValue === "all" || currentMultiSelectValue === "all")
      return setFormState({ ...formState, [key]: multiSelectValue });

    if (currentMultiSelectValue.includes(multiSelectValue)) {
      const arr = currentMultiSelectValue.split(",");

      arr.splice(arr.indexOf(multiSelectValue), 1);

      return setFormState({
        ...formState,
        [key]: arr.length === 1 ? arr[0].trim() : arr.join(",").trim(),
      });
    }

    if (currentMultiSelectValue)
      return setFormState({
        ...formState,
        [key]: `${currentMultiSelectValue},${multiSelectValue}`,
      });

    return setFormState({
      ...formState,
      [key]: multiSelectValue,
    });
  };

  const onResetForm = (): void => {
    return setFormState({ ...initialValueForm });
  };

  const onResetSpecificKeys = (keys: Array<keyof T>): void => {
    const updatedFormState = { ...formState };
    keys.forEach((key) => {
      updatedFormState[key] = initialValueForm[key];
    });

    return setFormState(updatedFormState);
  };

  return {
    formState: formState,
    onInputChange: onInputChange,
    onSelectChange: onSelectChange,
    onMultiSelectChange: onMultiSelectChange,
    onResetForm: onResetForm,
    onResetSpecificKeys: onResetSpecificKeys,
  };
};
