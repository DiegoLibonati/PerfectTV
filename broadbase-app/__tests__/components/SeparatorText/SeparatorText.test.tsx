import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import SeparatorText from "@/components/SeparatorText/SeparatorText";

const renderComponent = (className?: string): RenderResult =>
  render(<SeparatorText className={className!} />);

describe("SeparatorText", () => {
  describe("rendering", () => {
    it("should render an hr element", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLHRElement>("hr")).toBeInTheDocument();
    });

    it("should apply the provided className", () => {
      const { container } = renderComponent("custom-border");
      expect(container.querySelector<HTMLHRElement>("hr")).toHaveClass("custom-border");
    });

    it("should always include the base classes", () => {
      const { container } = renderComponent();
      const hr = container.querySelector<HTMLHRElement>("hr");
      expect(hr).toHaveClass("block");
      expect(hr).toHaveClass("h-1");
    });
  });
});
