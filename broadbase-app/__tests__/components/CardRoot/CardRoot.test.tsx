import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import CardRoot from "@/components/CardRoot/CardRoot";

const renderComponent = (className?: string): RenderResult =>
  render(<CardRoot className={className!}>card content</CardRoot>);

describe("CardRoot", () => {
  describe("rendering", () => {
    it("should render the provided children", () => {
      renderComponent();
      expect(screen.getByText("card content")).toBeInTheDocument();
    });

    it("should apply the provided className", () => {
      renderComponent("custom-class");
      const { container } = renderComponent("custom-class");
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should always include the card-root class", () => {
      const { container } = renderComponent();
      expect(container.firstChild).toHaveClass("card-root");
    });

    it("should always include the base shadow and rounded classes", () => {
      const { container } = renderComponent();
      expect(container.firstChild).toHaveClass("shadow-md");
      expect(container.firstChild).toHaveClass("rounded-lg");
    });
  });
});
