import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import LoaderSimple from "@/components/LoaderSimple/LoaderSimple";

const renderComponent = (className?: string): RenderResult =>
  render(<LoaderSimple className={className!} />);

describe("LoaderSimple", () => {
  describe("rendering", () => {
    it("should render a span element with the loader class", () => {
      const { container } = renderComponent();
      const span = container.querySelector<HTMLSpanElement>("span");
      expect(span).toBeInTheDocument();
      expect(span).toHaveClass("loader");
    });

    it("should apply the provided className alongside loader", () => {
      const { container } = renderComponent("border-t-white");
      const span = container.querySelector<HTMLSpanElement>("span");
      expect(span).toHaveClass("loader");
      expect(span).toHaveClass("border-t-white");
    });

    it("should render without className and only have loader class", () => {
      const { container } = renderComponent();
      const span = container.querySelector<HTMLSpanElement>("span");
      expect(span?.className).toContain("loader");
    });
  });
});
