import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import Heading3 from "@/components/Heading3/Heading3";

const renderComponent = (children = "Test heading"): RenderResult =>
  render(<Heading3>{children}</Heading3>);

describe("Heading3", () => {
  describe("rendering", () => {
    it("should render the provided children", () => {
      renderComponent("Subtitle text");
      expect(screen.getByText("Subtitle text")).toBeInTheDocument();
    });

    it("should apply the provided className", () => {
      render(<Heading3 className="custom-class">text</Heading3>);
      const el = screen.getByText("text");
      expect(el).toHaveClass("custom-class");
    });

    it("should always include the base text classes", () => {
      renderComponent();
      const el = screen.getByText("Test heading");
      expect(el).toHaveClass("text-lg");
      expect(el).toHaveClass("font-medium");
    });
  });
});
