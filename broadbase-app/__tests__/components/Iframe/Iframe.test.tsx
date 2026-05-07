import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { IframeProps } from "@/types/props";

import Iframe from "@/components/Iframe/Iframe";

const renderComponent = (props: Partial<IframeProps> = {}): RenderResult => {
  const defaultProps: IframeProps = {
    url: "https://example.com/stream",
    sizes: { height: 400, width: 600 },
    title: "Test iframe",
    ...props,
  };
  return render(<Iframe {...defaultProps} />);
};

describe("Iframe", () => {
  describe("rendering", () => {
    it("should render an iframe element", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLIFrameElement>("iframe")).toBeInTheDocument();
    });

    it("should set the src to the provided url", () => {
      const { container } = renderComponent({ url: "https://example.com/video" });
      expect(container.querySelector<HTMLIFrameElement>("iframe")).toHaveAttribute(
        "src",
        "https://example.com/video"
      );
    });

    it("should set the title attribute", () => {
      const { container } = renderComponent({ title: "My Video" });
      expect(container.querySelector<HTMLIFrameElement>("iframe")).toHaveAttribute(
        "title",
        "My Video"
      );
    });

    it("should set the provided height", () => {
      const { container } = renderComponent({ sizes: { height: 720, width: 1280 } });
      const iframe = container.querySelector<HTMLIFrameElement>("iframe");
      expect(iframe).toHaveAttribute("height", "720");
    });

    it("should set the provided width", () => {
      const { container } = renderComponent({ sizes: { height: 720, width: 1280 } });
      const iframe = container.querySelector<HTMLIFrameElement>("iframe");
      expect(iframe).toHaveAttribute("width", "1280");
    });

    it("should set the allow attribute when provided", () => {
      const { container } = renderComponent({ allow: "autoplay; fullscreen" });
      expect(container.querySelector<HTMLIFrameElement>("iframe")).toHaveAttribute(
        "allow",
        "autoplay; fullscreen"
      );
    });

    it("should apply the provided className", () => {
      const { container } = renderComponent({ className: "custom-class" });
      expect(container.querySelector<HTMLIFrameElement>("iframe")).toHaveClass("custom-class");
    });
  });
});
