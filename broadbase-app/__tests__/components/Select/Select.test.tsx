import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { SelectProps } from "@/types/props";

import Select from "@/components/Select/Select";

const mockOnChange = jest.fn();

const renderComponent = (props: Partial<SelectProps> = {}): RenderResult => {
  const defaultProps: SelectProps = {
    id: "test-select",
    name: "test-select",
    value: "option1",
    onChange: mockOnChange,
    ...props,
  };
  return render(
    <Select {...defaultProps}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </Select>
  );
};

describe("Select", () => {
  describe("rendering", () => {
    it("should render a select element", () => {
      renderComponent();
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should render with the provided id", () => {
      renderComponent({ id: "my-select" });
      expect(screen.getByRole("combobox")).toHaveAttribute("id", "my-select");
    });

    it("should render with the provided name", () => {
      renderComponent({ name: "language" });
      expect(screen.getByRole("combobox")).toHaveAttribute("name", "language");
    });

    it("should render the children options", () => {
      renderComponent();
      expect(screen.getByRole("option", { name: "Option 1" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Option 2" })).toBeInTheDocument();
    });

    it("should apply the provided className", () => {
      renderComponent({ className: "custom-class" });
      expect(screen.getByRole("combobox")).toHaveClass("custom-class");
    });
  });

  describe("behavior", () => {
    it("should call onChange when a new option is selected", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.selectOptions(screen.getByRole("combobox"), "option2");
      expect(mockOnChange).toHaveBeenCalled();
    });
  });
});
