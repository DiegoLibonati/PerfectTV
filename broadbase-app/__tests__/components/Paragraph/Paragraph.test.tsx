import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import Paragraph from "@/components/Paragraph/Paragraph";

const renderComponent = (children = "Test paragraph"): RenderResult =>
  render(<Paragraph>{children}</Paragraph>);

describe("Paragraph", () => {
  describe("rendering", () => {
    it("should render the provided children", () => {
      renderComponent("Some paragraph text");
      expect(screen.getByText("Some paragraph text")).toBeInTheDocument();
    });

    it("should render as a p element", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLParagraphElement>("p")).toBeInTheDocument();
    });

    it("should apply the provided className", () => {
      render(<Paragraph className="custom-class">text</Paragraph>);
      const el = screen.getByText("text");
      expect(el).toHaveClass("custom-class");
    });

    it("should always include the base text-sm class", () => {
      renderComponent();
      expect(screen.getByText("Test paragraph")).toHaveClass("text-sm");
    });
  });
});
