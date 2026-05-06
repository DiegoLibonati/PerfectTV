import { useState } from "react";

import type { ChangeEvent } from "react";
import type { UseFormProps } from "@/types/props";
import type { UseForm } from "@/types/hooks";

export const useForm = <T extends object>({ initialValueForm }: UseFormProps<T>): UseForm<T> => {
  const [formState, setFormState] = useState<T>(initialValueForm);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;
    const inputName = target.name;
    const inputValue = target.value;

    setFormState({ ...formState, [inputName]: inputValue });
  };

  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const target = e.target;
    const inputName = target.name;
    const inputValue = target.value;

    setFormState({ ...formState, [inputName]: inputValue });
  };

  const onMultiSelectChange = (e: ChangeEvent<HTMLSelectElement>, key: keyof T): void => {
    const target = e.target;
    const multiSelectValue = target.value;
    const currentMultiSelectValue = formState[key] as string;

    if (multiSelectValue === "all" || currentMultiSelectValue === "all") {
      setFormState({ ...formState, [key]: multiSelectValue });
      return;
    }

    if (currentMultiSelectValue.includes(multiSelectValue)) {
      const arr = currentMultiSelectValue.split(",");

      arr.splice(arr.indexOf(multiSelectValue), 1);

      setFormState({
        ...formState,
        [key]: arr.length === 1 ? arr[0]!.trim() : arr.join(",").trim(),
      });
      return;
    }

    if (currentMultiSelectValue) {
      setFormState({
        ...formState,
        [key]: `${currentMultiSelectValue},${multiSelectValue}`,
      });
      return;
    }

    setFormState({
      ...formState,
      [key]: multiSelectValue,
    });
  };

  const onResetForm = (): void => {
    setFormState({ ...initialValueForm });
  };

  const onResetSpecificKeys = (keys: (keyof T)[]): void => {
    const updatedFormState = { ...formState };
    keys.forEach((key) => {
      updatedFormState[key] = initialValueForm[key];
    });

    setFormState(updatedFormState);
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
