import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { Select } from "@src/components/Select/Select";

describe("Select", () => {
  describe("General Tests.", () => {
    const props = {
      id: "id",
      value: "valucito",
      name: "name",
      onChange: vi.fn(),
    };

    test("It must render the component correctly.", () => {
      render(
        <Select
          id={props.id}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
        ></Select>
      );

      const select = screen.getByRole("combobox") as HTMLSelectElement;

      expect(select).toBeInTheDocument();
      expect(select.id).toEqual(props.id);
      expect(select.name).toEqual(props.name);
    });

    test("It should call onChange when a different option is selected.", () => {
      render(
        <Select
          id={props.id}
          name={props.name}
          onChange={props.onChange}
          value={""}
        >
          <option value="valucito">Valucito</option>
          <option value="other">Other</option>
        </Select>
      );

      const select = screen.getByRole("combobox") as HTMLSelectElement;

      fireEvent.change(select, { target: { value: "other" } });

      expect(props.onChange).toHaveBeenCalledTimes(1);
    });
  });
});
