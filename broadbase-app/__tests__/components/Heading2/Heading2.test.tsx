import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import Heading2 from "@/components/Heading2/Heading2";

const renderComponent = (children = "Test heading"): RenderResult =>
  render(<Heading2>{children}</Heading2>);

describe("Heading2", () => {
  describe("rendering", () => {
    it("should render as an h2 element", () => {
      renderComponent();
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    it("should render the provided children", () => {
      renderComponent("My Title");
      expect(screen.getByRole("heading", { name: "My Title" })).toBeInTheDocument();
    });

    it("should apply the provided className", () => {
      render(<Heading2 className="custom-class">text</Heading2>);
      expect(screen.getByRole("heading")).toHaveClass("custom-class");
    });

    it("should always include the base text classes", () => {
      renderComponent();
      const heading = screen.getByRole("heading");
      expect(heading).toHaveClass("text-xl");
      expect(heading).toHaveClass("font-semibold");
    });
  });
});
