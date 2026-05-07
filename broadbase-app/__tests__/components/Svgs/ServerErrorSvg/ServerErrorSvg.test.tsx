import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import ServerErrorSvg from "@/components/Svgs/ServerErrorSvg/ServerErrorSvg";

const renderComponent = (): RenderResult => render(<ServerErrorSvg />);

describe("ServerErrorSvg", () => {
  describe("rendering", () => {
    it("should render an svg element with role img", () => {
      renderComponent();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("should apply the provided className", () => {
      render(<ServerErrorSvg className="h-64 w-64" />);
      expect(screen.getByRole("img")).toHaveClass("h-64");
      expect(screen.getByRole("img")).toHaveClass("w-64");
    });

    it("should render as an svg element", () => {
      const { container } = renderComponent();
      expect(container.querySelector<SVGSVGElement>("svg")).toBeInTheDocument();
    });
  });
});
