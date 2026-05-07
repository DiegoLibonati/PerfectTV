import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import SelectOption from "@/components/SelectOption/SelectOption";

const renderComponent = (value: string, children = "Option text"): RenderResult =>
  render(
    <select>
      <SelectOption value={value}>{children}</SelectOption>
    </select>
  );

describe("SelectOption", () => {
  describe("rendering", () => {
    it("should render the provided children as option text", () => {
      renderComponent("opt1", "My Option");
      expect(screen.getByRole("option", { name: "My Option" })).toBeInTheDocument();
    });

    it("should render with the provided value", () => {
      renderComponent("opt1");
      expect(screen.getByRole("option")).toHaveValue("opt1");
    });
  });
});
